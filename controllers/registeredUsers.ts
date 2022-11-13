import { Request, Response } from "express";
import { collections } from "services/database";
import { ObjectId } from "mongodb";

export async function RegisterUserToEvent(
  req: Request,
  res: Response
  // eventId: ObjectId
) {
  console.log("Here--------")
  const { id, name, age, email, phoneNumber, eventId } = req.body;

  // const filter = {_id: new ObjectId()}
  // const event = await collections.events.find({ _id: eventId }).toArray();
  const update = {
    $push: {

      registeredUsers: { id, name, age, email, phoneNumber },

    },
  };
  if (!eventId) {
    res.status(500).json({
      ok: false,
      message: "something went wrong?",
    });
  }
  console.log("evId", eventId)
  const events = await collections.events.findOne({ _id: new ObjectId(eventId) });
  console.log("event", events)
  const result = await collections.events.updateOne({ _id: new ObjectId(eventId) }, update);
  if (result) {
    console.log("result-----", result)
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
