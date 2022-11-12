import { ObjectId } from "mongodb";

export default interface Event {
  name: string;
  description: string;
  category: string;
  createdBy: string;
  id?: ObjectId;
}
