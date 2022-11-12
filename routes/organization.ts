import { Router } from "express";
import { GetOrganization } from "controllers/organization";

export const organizationRouter = Router();
organizationRouter.get("/:id", GetOrganization);
