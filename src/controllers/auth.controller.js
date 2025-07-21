import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const register = async (req, res) => {
  let { username, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["the email is already in use"]);

    const passwordhash = await bcrypt.hash(password, 10);
    let oneFound = new User({
      username,
      email,
      password: passwordhash,
    });

    const oneFoundSaved = await oneFound.save();
    let token = await createAccessToken({ id: oneFoundSaved._id });
    res.cookie("token", token);
    res.json({
      message: "User created successfully",
      id: oneFoundSaved._id,
      username: oneFoundSaved.username,
      email: oneFoundSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    const oneFound = await User.findOne({ email });
    if (!oneFound) return res.status(400).json({ message: "User not found" });

    const isMach = await bcrypt.compare(password, oneFound.password);
    if (!isMach) return res.status(400).json({ message: "Incorrect password" });

    let token = await createAccessToken({ id: oneFound._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });
    res.json({
      message: "User login successfully",
      id: oneFound._id,
      username: oneFound.username,
      email: oneFound.email,
      createAt: oneFound.createAt,
      updatedAt: oneFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0), // Fecha de expiracion
  });
  return res.status(200).json({
    message: "Session expired",
  });
};

export const profile = async (req, res) => {
  // console.log("el user es");
  console.log(req.user);
  console.log(req.user.payload.id);
  let oneFound = await User.findById(req.user.payload.id);
  console.log(oneFound);
  if (!oneFound)
    return res.status(400).json({
      message: "User not found",
    });

  return res.json({
    message: "User login successfully",
    id: oneFound._id,
    username: oneFound.username,
    email: oneFound.email,
    createAt: oneFound.createAt,
    updatedAt: oneFound.updatedAt,
  });

  // res.send('profile');
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, config.SECRET_KEY , async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById({_id: user.payload.id});
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
