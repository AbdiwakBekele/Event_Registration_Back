import { Router } from "express";
import { GetUsers, GetUser, updateUser } from "controllers/users";
import { updateEvent } from "controllers/event";

export const userRouter = Router();
userRouter.get("/", GetUsers);
userRouter.get("/:id", GetUsers);
userRouter.put("/:id", updateEvent);