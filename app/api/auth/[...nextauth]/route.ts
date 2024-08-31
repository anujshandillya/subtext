import { client } from "@/prisma/seed";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import { create } from "domain";
import bcryptjs from 'bcryptjs';

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async signIn({ user, account }) {
      try {
        const userExists = await client.user.findFirst({
          where: {
            email: user.email!
          },
        });
        if(!userExists) {
          const token = await bcryptjs.hash(user.email!, 10);
          const verifyToken = token+user.email!;
          const newUser = await client.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              username: user.email!.split('@')[0], 
              password: token, 
              // verifyEmailToken: verifyToken,
              // verifyEmailTokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
          })
        }else {
          console.log({
            "message": "User already exists",
          })
          return true;
        }
      } catch (error) {
        console.error(error);
      }

      return true;
    },
  },
})

export { handler as GET, handler as POST }


// {
//   id: '100087210226627664212',
//   name: 'Anuj Sharma',
//   email: 'anujsharmawork11@gmail.com',
//   image: 'https://lh3.googleusercontent.com/a/ACg8ocKfjQs6styUIgq6fpmcUiPmHFYxqCBTIGONvbLKMBm5dLqncQ=s96-c'
// }