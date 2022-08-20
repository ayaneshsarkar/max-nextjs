import { connectDatabase, insertDocument } from '../../../helpers/db-util'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Invalid method' })
  }

  const userEmail = req.body.email

  if (!userEmail || !userEmail.includes('@')) {
    return res.status(422).json({
      message: 'Invalid email address.'
    })
  }

  let client;

  try {
    client = await connectDatabase()
  } catch (err) {
    return res.status(500).json({ message: 'Connecting to tha database failed!' })
  }

  try {
    await insertDocument(client, 'newsletter', { email: userEmail })
    client.close()
  } catch (err) {
    return res.status(500).json({ message: 'Inserting data failed!' })
  }

  return res.status(201).json({ message: 'Signed up!' })
}

export default handler