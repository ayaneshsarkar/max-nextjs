import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect("mongodb+srv://ayanesh:ayanesh%40502@cluster0.fv1rk.mongodb.net/auth-demo?authSource=admin&replicaSet=atlas-a2zv6r-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")

  return client
}