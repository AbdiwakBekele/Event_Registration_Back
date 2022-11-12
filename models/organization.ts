import { ObjectId } from "mongodb";

export interface Organizaton {
  organization_name: string;
  createdBy: string;
  id?: ObjectId;
}
