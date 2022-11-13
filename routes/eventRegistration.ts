import { Router } from "express";
import { RegisterUserToEvent } from "controllers/userRegistration";
import { VerifyUser } from "controllers/users";

export const eventRegistrationRouter = Router();

eventRegistrationRouter.put("/", RegisterUserToEvent);
eventRegistrationRouter.post("/", VerifyUser);
