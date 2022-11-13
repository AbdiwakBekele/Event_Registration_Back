import { ObjectId } from "mongodb";
import { Response, Request, NextFunction } from "express";
import { collections } from "services/database";

export async function GetUsers(
    _req: Request,
    res: Response,
    _next: NextFunction
): Promise<void> {
    const result = await collections.users.find({}).toArray();
    if (result.length == 0) {
        res.status(500).json({

            message: "No users were found",
        });
    } else {
        res.status(200).json({
            ok: true,
            users: result,
        });
    }
}

export async function GetUser(
    req: Request,
    res: Response,
    _next: NextFunction
) {
    const id = req.params.id;
    try {
        const filter = { _id: new ObjectId(id) };
        const event = await collections.users.findOne(filter);
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

export async function createUser(
    id: ObjectId,
    req: Request,
    res: Response
): Promise<ObjectId> {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
        res.status(400).json({
            ok: false,
            message: "All fields are required",
        });
    }

    const createdBy = id;

    const result = await collections.users.insertOne({
        name,
        email,
        password,

    });
    return result.insertedId;
}

export async function updateUser(req: Request, res: Response) {
    const id = req.params.id;
    const body = req.body;
    const filter = { _id: new ObjectId(id) };
    const update = {
        $set: {
            ...body

        },
    };
    const result = await collections.users.updateOne(filter, update);
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

}
