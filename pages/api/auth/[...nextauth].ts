import NextAuth, { NextAuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import axios from "axios"
import prisma from "../../../lib/prisma"
import { NextApiHandler, NextApiRequest } from "next";
import { apiUrl } from "../../../utils/apiUrl";
import axiosRetry from "axios-retry"
type ExtendedUserType = User & { username?: string; uid?: string };

const date = new Date();
const offset = date.getTimezoneOffset();
const timezone = (parseInt(String(offset)) * -1) / 60;

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  providers: [
    GoogleProvider({
      clientId: "588894309229-73qesgpsmdqugf7g6poi8uij485fn05j.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any, req) => {
        const user = await fetch(`${apiUrl()}user/read/checkcredentials?` + new URLSearchParams({
          email: credentials.username,
          password: credentials.password,
        })).then((res) => res.json()).catch((err) => {
          console.log(err)
          return null
        })

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },
  jwt: {
    secret: 'secret token',
  },
  secret: "secret token",
  pages: {
    signIn: '/signin',
    signOut: '/signup'
  },
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (user) {
        token.uid = user.id;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, user, token }) => {
      (session.user as ExtendedUserType).id = String(token?.uid)
      return session
    }
  },
  events: {
    createUser: async ({ user }) => {
      axiosRetry(axios, { retries: 3 });
      await axios.post(`${apiUrl()}user/write/createnextauth`, null, { params: { userId: user.id, email: user.email, timezone: timezone } })
    }
  }
}

const authHandler: NextApiHandler = (req: any, res: any) =>
  NextAuth(req, res, options);
export default authHandler;