import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { hash } from "bcrypt";
import { collections } from "services/database";
import { createOrganization } from "controllers/organization";

export async function register(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const { name, email, password, organization_name } = req.body;
    const user = await collections.users.findOne({ email });
    if (user) {
      const user_id = user._id;
      const token = sign({ user_id, email }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({
        ok: true,
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

    if (!(name && email && password)) {
      res.status(400).json({
        ok: false,
        message: "All Fields Are Required",
      });
    } else if (name && email && password && !organization_name) {
      res.status(200).json({
        ...usersCollection,
        token,
      });
      return;
    } else {
      const { createdBy, events, organization_id } = await createOrganization(
        res,
        organization_name,
        result.insertedId
      );
      res.status(200).json({
        ...usersCollection,
        token,
        organization_name,
        organization_id,
        createdBy,
        events,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
