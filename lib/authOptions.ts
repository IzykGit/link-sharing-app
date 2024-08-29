import GithubProvider from "next-auth/providers/github"

import createShareDoc from "@/pages/api/createShareDoc"

export const authOptions = {
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
    },
    events: {
        signIn: async ({ user, isNewUser }: any) => {

          if(isNewUser) {
            await createShareDoc(user)
          }
          else {
            console.log("not new user")
          }
        },
    },
    callbacks: {
        async redirect({ url, baseUrl }: any) {
            return "/pages/home"
        }
    }
}