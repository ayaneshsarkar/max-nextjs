import { MongoClient } from 'mongodb'

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://ayanesh:ayanesh%40502@cluster0.fv1rk.mongodb.net/events?authSource=admin&replicaSet=atlas-a2zv6r-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
  )

  return client
}

export const insertDocument = async (client, collection, document) => {
  const db = client.db()
  const result = await db.collection(collection).insertOne(document)
  return result
}

export const getAllDocuments = async (client, collection, sort) => {
  const db = client.db();
  
  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();

  return documents
}
