import { ObjectId } from "mongodb";
import { Response, Request, NextFunction } from "express";
import { collections } from "services/database";

export async function GetEvents(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const result = await collections.events.find({}).toArray();
  if (result.length == 0) {
    res.status(500).json({
      message: "No events were found",
    });
  } else {
    res.status(200).json({
      ok: true,
      events: result,
    });
  }
}

export async function GetEvent(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const id = req.params.id;
  try {
    const filter = { _id: new ObjectId(id) };
    const event = await collections.events.findOne(filter);
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

export async function GetEventByUniqueID(req: Request, res: Response) {
  const id = parseInt(req.params.uniqueId, 10);
  try {
    const filter = { uniqueId: id };
    const event = await collections.events.findOne(filter);
    if (event) {
      res.status(200).send(event);
    } else {
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      message: `unable to find matching document with id ${id}`,
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
  const uniqueId = Math.floor(Math.random() * 900) + 100;
  const createdBy = id;

  const result = await collections.events.insertOne({
    name,
    description,
    category,
    createdBy,
    uniqueId,
  });
  return result.insertedId;
}

export async function updateEvent(req: Request, res: Response) {
  const id = req.params.id;
  const { name, description, category } = req.body;
  const filter = { _id: new ObjectId(id) };
  const update = {
    $set: {
      ...name,
      ...description,
      ...category,
    },
  };
  const result = await collections.events.updateOne(filter, update);
  if (result) {
    res.status(200).json({
      ok: true,
      message: `successfully updated event with id ${id}`,
    });
  } else {
    res.status(304).json({
      ok: false,
      message: `failed to update event with id ${id}`,
    });
  }
  // if (name && description && category) {
  //   const update = {
  //     $set: {
  //       name,
  //       description,
  //       category,
  //     },
  //   };
  //   const result = await collections.events.updateOne(filter, update);
  //   if (result) {
  //     res.status(200).json({
  //       ok: true,
  //       message: `successfully updated event with id ${id}`,
  //     });
  //   } else {
  //     res.status(304).json({
  //       ok: false,
  //       message: `failed to update event with id ${id}`,
  //     });
  //   }
  // } else if (name && !description && !category) {
  //   const update = {
  //     $set: {
  //       name,
  //       description,
  //       category,
  //     },
  //   };
  //   const result = await collections.events.updateOne(filter, update);
  //   if (result) {
  //     res.status(200).json({
  //       ok: true,
  //       message: `successfully updated event with id ${id}`,
  //     });
  //   } else {
  //     res.status(304).json({
  //       ok: false,
  //       message: `failed to update event with id ${id}`,
  //     });
  //   }
  // } else if (!name && description && !category) {
  //   const update = {
  //     $set: {
  //       name,
  //       description,
  //       category,
  //     },
  //   };
  //   const result = await collections.events.updateOne(filter, update);
  //   if (result) {
  //     res.status(200).json({
  //       ok: true,
  //       message: `successfully updated event with id ${id}`,
  //     });
  //   } else {
  //     res.status(304).json({
  //       ok: false,
  //       message: `failed to update event with id ${id}`,
  //     });
  //   }
  // } else if (!name && !description && category) {
  //   const update = {
  //     $set: {
  //       name,
  //       description,
  //       category,
  //     },
  //   };
  //   const result = await collections.events.updateOne(filter, update);
  //   if (result) {
  //     res.status(200).json({
  //       ok: true,
  //       message: `successfully updated event with id ${id}`,
  //     });
  //   } else {
  //     res.status(304).json({
  //       ok: false,
  //       message: `failed to update event with id ${id}`,
  //     });
  //   }
  // }
}

export async function DeleteAll() {
  const result = await collections.events.deleteMany({});
  return result.deletedCount;
}
