import { Response } from "express";
import { collections } from "services/database";

export async function createOrganization(
  res: Response,
  organization_name: string,
  createdBy: string
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
