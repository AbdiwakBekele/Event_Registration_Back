import { Router } from "express";
import {
  GetEvents,
  GetEvent,
  updateEvent,
  DeleteAll,
  GetEventByUniqueID,
} from "controllers/event";

export const eventRouter = Router();
eventRouter.get("/", GetEvents);
eventRouter.get("/:id", GetEvent);
eventRouter.get("/unique/:uniqueId", GetEventByUniqueID);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/", DeleteAll);
