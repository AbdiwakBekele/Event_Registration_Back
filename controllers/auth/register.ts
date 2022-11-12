import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { hash } from "bcrypt";
import { collections } from "services/database";

export async function register(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      res.status(400).json({
        ok: false,
        message: "All Fields Are Required",
      });
    }

    // check if user exists
    const user = await collections.users.findOne({ email });
    if (user) {
      res.status(409).json({
        ok: false,
        message: "User already exists, login instead",
      });
    }
    const hashedPassword = await hash(password, 10);

    const result = await collections.users.insertOne({
      name,
      email: (email as string).toLowerCase(),
      password: hashedPassword,
    });

    const token = sign({ user_id: result, email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    const usersCollection = await collections.users.findOne({
      _id: result.insertedId,
    });

    res.status(200).json({
      ...usersCollection,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}
