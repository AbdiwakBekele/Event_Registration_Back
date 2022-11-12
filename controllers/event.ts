import { ObjectID } from "bson";
import { ObjectId } from "mongodb";
import { Response, Request, NextFunction } from "express";
import { collections } from "services/database";

export async function GetEvents(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const query = { id: ObjectID };
  const result = await collections.events.find(query).toArray();
  if (result.length == 0) {
    res.status(500).json({
      message: "No events were found",
    });
  }
  res.status(200).json({
    ok: true,
    result,
  });
}

export async function GetEvent(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectID(id) };
    const event = await collections.events.findOne(query);
    if (event) {
      res.status(200).send(event);
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      message: `Unable to find matching document with id: ${req.params.id}`,
    });
  }
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
