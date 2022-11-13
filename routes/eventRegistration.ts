import { Router } from "express";
import { RegisterUserToEvent } from "controllers/userRegistration";

export const eventRegistrationRouter = Router();

eventRegistrationRouter.put("/", RegisterUserToEvent);
