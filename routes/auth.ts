import { Router } from "express";
import { register } from "controllers/auth/register";
import { login } from "controllers/auth/login";

export const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
