import { Router } from "express";
import { GetEvents, GetEvent } from "controllers/event";

export const eventRouter = Router();
eventRouter.get("/", GetEvents);
eventRouter.get("/:id", GetEvent);
