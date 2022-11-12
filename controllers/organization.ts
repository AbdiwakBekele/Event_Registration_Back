import { Response, NextFunction, Request } from "express";
import { ObjectId } from "mongodb";
import { collections } from "services/database";
import { createEvent } from "./event";

export async function GetOrganizations(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const query = { _id: ObjectId };
  const organizations = await collections.organization.find(query).toArray();
  if (organizations.length == 0) {
    res.status(500).json({
      ok: false,
      message: "No organization found",
    });
  }
  res.status(200).json({
    ok: true,
    organizations,
  });
}

export async function GetOrganization(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const organization = await collections.organization.findOne(query);
    if (organization) {
      res.status(200).send(organization);
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      message: `No organization with the id ${id} was found`,
    });
  }
}

export async function createOrganization(
  res: Response,
  organization_name: string,
  createdBy: ObjectId
) {
  // check if the organization exists
  const organization = await collections.organization.findOne({
    organization_name,
  });
  if (organization) {
    res.status(409).json({
      ok: false,
      message: `The organization name "${organization}" already exists`,
    });
  }

  await collections.organization.insertOne({
    organization_name,
    createdBy,
  });

  return {
    organization_name,
    createdBy,
  };
}

export async function createNewEvent(req: Request, res: Response) {
  const { organization_id } = req.body;
  const result = await createEvent(organization_id, req, res);
  res.status(200).json({
    ok: true,
    message: `successfully created event with id ${result}, go to /api/events/${result}`,
  });
}
