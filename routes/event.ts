import { Router } from "express";
import { GetEvents, GetEvent, updateEvent, DeleteAll } from "controllers/event";

export const eventRouter = Router();
eventRouter.get("/", GetEvents);
eventRouter.get("/:id", GetEvent);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/", DeleteAll);
