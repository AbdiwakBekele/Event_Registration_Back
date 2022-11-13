import { Router } from "express";
import { GetUsers, GetUser, updateUser, VerifyUser } from "controllers/users";

export const userRouter = Router();
userRouter.get("/", GetUsers);
userRouter.get("/:id", GetUser);
userRouter.put("/:id", updateUser);
userRouter.post("/", VerifyUser);
