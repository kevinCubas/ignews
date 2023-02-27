import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { Client as FaunaClient, query as q } from "faunadb";

const fauna = new FaunaClient({
  secret: process.env.FAUNADB_KEY!,
});

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email!)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email!)
              )
            )
          )
        )
        return true
      } catch {
        return false
      }
    },
  }
})