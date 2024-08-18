import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"

import clientPromise from "@/lib/mongodb"


export default NextAuth({
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      })
    ],
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
      signIn: "/auth/signIn.tsx",
      newUser: "/auth/signUp.tsx"
    },
    events: {
      async createUser() {

        const client = await clientPromise;
        const db = client.db("LinkShare")

        const shareModel = {
          firstName: "",
          lastName: "",
          email: "",
          links: []
        }

        await db.collection("shares").insertOne(shareModel)
      }
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return "/pages/homePage"
        }
    }
})