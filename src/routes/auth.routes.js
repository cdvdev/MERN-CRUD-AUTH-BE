import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { logingSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(logingSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);

export default router;
