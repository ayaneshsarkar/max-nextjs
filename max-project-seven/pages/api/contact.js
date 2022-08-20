import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Invalid method!' });
  }

  const { email, name, message } = req.body;
  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !message ||
    message.trim() === ''
  ) {
    return res.status(422).json({ message: 'Invalid input data.' });
  }

  const newMessage = { email, name, message };

  let client;

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.fv1rk.mongodb.net/${process.env.mongodb_database}?authSource=admin&replicaSet=atlas-a2zv6r-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;

  try {
    client = await MongoClient.connect(connectionString);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Could not connect to the database.' });
  }

  const db = client.db();

  try {
    const result = await db.collection('messages').insertOne(newMessage);
    newMessage.id = result.insertedId;
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Could not connect to the database.' });
  }

  client.close();

  return res
    .status(201)
    .json({ message: 'Successfully sent message!', message: newMessage });
};

export default handler;
