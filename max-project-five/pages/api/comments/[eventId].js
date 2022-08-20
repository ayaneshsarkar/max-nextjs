import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util';

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client
  
  try {
    client = await connectDatabase()
  } catch (err) {
    return res.status(500).json({ message: 'Connecting to the database failed!' })
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      client.close()
      return res.status(422).json({ message: 'Invalid input.' });
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, 'comments', newComment)
      newComment._id = result.insertedId;

      client.close()

      return res
        .status(201)
        .json({ message: 'Added comment', comment: newComment });
    } catch (err) {
      client.close()
      return res.status(500).json({ message: 'Inserting comment failed!' })
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 })
      client.close();
      return res.status(200).json({ comments: documents });
    } catch (err) {
      client.close()
      return res.status(500).json({ message: 'Getting comments failed!' })
    }
  }
};

export default handler;
