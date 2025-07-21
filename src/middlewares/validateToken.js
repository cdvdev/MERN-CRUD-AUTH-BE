import jwt from "jsonwebtoken"
import { config } from "../config.js"

export const authRequired = (req, res, next) => {
    // console.log("validated token");
    // console.log(req.headers);
    // console.log(req.headers.cookie);
    // const cookies = req.cookies;
    // console.log(cookies);
    const { token } = req.cookies;
    if(!token) return res.status(401).json({
        message: "No token, authorization denied"
    });

    jwt.verify(token, config.SECRET_KEY, (error, user) => {
        if(error) return res.status(403).json({message: "Invalid Token"});
        
        // console.log("User");
        // console.log(user);
        req.user = user;
    });
    next()
}