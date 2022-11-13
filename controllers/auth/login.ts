import { Request, Response, NextFunction } from "express";
import { collections } from "services/database";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export async function login(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({
        ok: false,
        message: "All fields are required",
      });
    }

    const user = await collections.users.findOne({ email });
    const id = user._id;
    const org = await collections.organization.findOne({ createdBy: id });
    const organization_name = org.organization_name;
    const organization_id = org._id;
    // console.log(org.organization_name);
    // console.log(org._id);
    // console.log(user);
    // console.log("User password", user.password);
    const comparedPassword = await compare(password, user.password);
    if (user && comparedPassword) {
      const token = sign({ user_id: user._id, email }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({
        ok: true,
        message: "successfully logged in",
        token,
        organization_name,
        organization_id,
      });
    } else {
      res.status(400).json({
        ok: false,
        message: "Wrong Credentials",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
