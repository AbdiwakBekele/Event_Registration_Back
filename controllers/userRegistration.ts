import { Request, Response } from "express";
import { collections } from "services/database";
import { ObjectId } from "mongodb";

export async function RegisterUserToEvent(
  req: Request,
  res: Response
  // eventId: ObjectId
) {
  // console.log("Here--------");
  const { id, name, email, eventId } = req.body;

  const update = {
    $push: {
      registeredUsers: { id, name, email },
    },
  };

  if (!eventId) {
    res.status(500).json({
      ok: false,
      message: "something went wrong?",
    });
  }
  const result = await collections.events.updateOne(
    { _id: new ObjectId(eventId) },
    update
  );
  if (result) {
    console.log("result-----", result);
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

export async function VerifyUser(req: Request, res: Response) {
  const { status, eventId } = req.body;
  console.log("Event Id --------", req.body);
  const update = {
    $push: {
      registeredUsers: { status },
    },
  };
  const result = await collections.events.updateOne(
    {
      _id: new ObjectId(eventId),
    },
    update
  );
  if (result) {
    res.status(200).json({
      ok: true,
    });
  } else {
    res.status(304).json({
      ok: false,
      message: "something went wrong",
    });
  }
}
