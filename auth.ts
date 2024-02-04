import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"


export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ]
}