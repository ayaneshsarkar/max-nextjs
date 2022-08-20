import { getSession } from "next-auth/react"
import { connectToDatabase } from '../../../lib/db'
import { verifyPassword, hashPassword } from "../../../lib/auth"

const handler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Invalid method.' })
  }

  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Not Authenticated.' })
  }

  const userEmail = session.user.email
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  const client = await connectToDatabase()
  const usersCollection = client.db().collection('users')

  const user = await usersCollection.findOne({ email: userEmail })

  if (!user) {
    client.close()
    return res.status(404).json({ message: 'User not found!' })
  }

  const currentPassword = user.password
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

  if (!passwordsAreEqual) {
    client.close()
    return res.status(403).json({ message: 'Invalid Password.' })
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  )

  client.close()

  res.status(200).json({ message: 'Password updated.' })
}

export default handler