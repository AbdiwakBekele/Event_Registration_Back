import { Router } from "express";
import {
  createNewEvent,
  GetOrganization,
  GetOrganizations,
} from "controllers/organization";

export const organizationRouter = Router();
organizationRouter.get("/:id", GetOrganization);
organizationRouter.get("/", GetOrganizations);
organizationRouter.post("/events", createNewEvent);
