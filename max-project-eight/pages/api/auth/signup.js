import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

const handler = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Invalid method.' })
    }

    const data = req.body;
    const { email, password } = data;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      return res.status(422).json({
        message:
          'Invalid input - password should atleast be 7 characters long.',
      });
    }

    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email })

    if (existingUser) {
      client.close()
      return res.status(422).json({ message: 'User already exists!' })
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    client.close()
    res.status(201).json({ message: 'Created user!' });
  } catch (err) {
    client.close()
    return res.status(500).json({ message: err.message })
  }
};

export default handler