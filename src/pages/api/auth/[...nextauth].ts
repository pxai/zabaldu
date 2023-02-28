import { NextApiHandler } from 'next';
import NextAuth, { Session, User } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import prisma from '../../../lib/prisma';
import { JWT } from 'next-auth/jwt';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

type SessionParam = {
  session: Session;
  token: JWT;
  user: User;
}
const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async session({session, token, user}: SessionParam) {
        session = {
            ...session,
            user
        }
        return session
    }
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_PUBLIC_SECRET,
};