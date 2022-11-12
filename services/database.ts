import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: {
  users?: mongoDB.Collection;
  events?: mongoDB.Collection;
} = {};

export async function connectToDB() {
  // load .env
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_URI
  );

  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  console.log(`Successfully connected to database: ${db.databaseName}`);
}
