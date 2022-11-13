import { ObjectId } from "mongodb";

export default interface Event {
  name: string;
  description: string;
  category: "training" | "concert" | "seminar";
  createdBy: string;
  backgroundPicture: string;
  latitude: string;
  longitude: string;
  registeredUsers: Record<string, unknown>;
  date: string;
  id?: ObjectId;
}
