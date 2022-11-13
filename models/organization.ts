import { ObjectId } from "mongodb";
import Event from "./event";

export interface Organization {
  organization_name: string;
  createdBy: string;
  events: Event[];
  id?: ObjectId;
}
