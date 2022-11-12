import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: {
  users?: mongoDB.Collection;
  events?: mongoDB.Collection;
  organization?: mongoDB.Collection;
} = {};

export async function connectToDB() {
  // load .env
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_URI
  );

  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const usersCollection: mongoDB.Collection = db.collection(
    process.env.USERS_COLLECTION_NAME
  );

  collections.users = usersCollection;

  const eventsCollection: mongoDB.Collection = db.collection(
    process.env.EVENTS_COLLECTION_NAME
  );

  collections.events = eventsCollection;

  const organizationCollection: mongoDB.Collection = db.collection(
    process.env.ORGANIZATION_COLLECTION_NAME
  );
  collections.organization = organizationCollection;

  console.log(`Successfully connected to database: ${db.databaseName}`);
}
