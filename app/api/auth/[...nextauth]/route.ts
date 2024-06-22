import { authOptions } from '@/app/lib/authOptions';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
