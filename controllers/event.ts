import { ObjectId } from "mongodb";
import { Response, Request, NextFunction } from "express";
import { collections } from "services/database";

export async function GetEvents(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const query = { id: ObjectId };
  const result = await collections.events.find(query).toArray();
  if (result.length == 0) {
    res.status(500).json({
      message: "No events were found",
    });
  }
  res.status(200).json({
    ok: true,
    events: result,
  });
}

export async function GetEvent(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
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
  id: ObjectId,
  req: Request,
  res: Response
): Promise<ObjectId> {
  const { name, description, category } = req.body;
  if (!(name && description && category)) {
    res.status(400).json({
      ok: false,
      message: "All fields are required",
    });
  }

  const createdBy = id;

  const result = await collections.events.insertOne({
    name,
    description,
    category,
    createdBy,
  });
  return result.insertedId;
}

export async function updateEvent(req: Request, res: Response) {}
