import { ObjectId } from "mongodb";

export default interface Event {
  name: string;
  description: string;
  category: string;
  createdBy: string;
  backgroundPicture: string;
  latitude: string;
  longitude: string;
  registeredUsers: Record<string, unknown>;
  date: string;
  id?: ObjectId;
}
