import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
    /* jwt: {
      // The maximum age of the NextAuth.js issued JWT in seconds.
      // Defaults to `session.maxAge`.
      maxAge: 60 * 60 * 24 * 30,
      // You can define your own encode/decode functions for signing and encryption
      async encode() {},
      async decode() {},
    } */
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase()

        const usersCollection = client.db().collection('users')
        const user = await usersCollection.findOne({ email: credentials.email })

        if (!user) {
          client.close()
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(credentials.password, user.password)

        if (!isValid) {
          client.close()
          throw new Error('Could not log you in!')
        }

        client.close()
        return { email: user.email }
      }
    })
  ]
})