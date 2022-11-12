import { Response, NextFunction, Request } from "express";
import { ObjectId } from "mongodb";
import { collections } from "services/database";

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

export async function createEvent(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { name, description, category } = req.body;
  if (!(name && description && category)) {
    res.status(400).json({
      ok: false,
      message: "All fields are required",
    });
  }

  // const createdBy = ;

  const result = collections.events.insertOne({
    name,
    description,
    category,
    // createdBy
  });
}
