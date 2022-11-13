import { Router } from "express";
import { RegisterUserToEvent } from "controllers/registeredUsers";

export const eventRegistrationRouter = Router();

eventRegistrationRouter.post("/", RegisterUserToEvent);
