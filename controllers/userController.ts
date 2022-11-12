import { Request, Response } from "express";
import { collections } from "services/database";
import User from "models/user";

function GetAllUsers(req: Request, res: Response) {
  const event = collections.events.findOne();
}
