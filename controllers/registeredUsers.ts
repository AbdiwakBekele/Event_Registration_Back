import { Request, Response } from "express";
import { collections } from "services/database";

export async function RegisterUserToEvent(
  req: Request,
  res: Response
  // eventId: ObjectId
) {

  const { id, name, age, email, phoneNumber, eventId } = req.body;

  // const filter = {_id: new ObjectId()}
  // const event = await collections.events.find({ _id: eventId }).toArray();
  const update = {
    $set: {

      registeredUsers: { id, name, age, email, phoneNumber },

    },
  };
  if (!eventId) {
    res.status(500).json({
      ok: false,
      message: "something went wrong?",
    });
  }
  const result = await collections.events.updateOne({ _id: eventId }, update);
  if (result) {
    res.status(200).json({
      ok: true,
    });
  } else {
    res.status(304).json({
      ok: false,
      message: "something went wrong!",
    });
  }
}
