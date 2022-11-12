import { ObjectId } from "mongodb";

export interface Organizaton {
  name: string;
  createdBy: string;
  id?: ObjectId;
}
