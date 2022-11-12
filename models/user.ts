import { ObjectId } from "mongodb";

export default interface User {
  name: string;
  email: string;
  password: string;
  id?: ObjectId;
}
