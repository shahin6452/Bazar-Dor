import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("beeter-auth"); // বানানটা 'better-auth' কিনা দেখুন, তবে পুরনো ইউজার থাকলে নাম বদলাবেন না

export const auth = betterAuth({
  emailAndPassword: { enabled: true },
  database: mongodbAdapter(db, { client }),
});