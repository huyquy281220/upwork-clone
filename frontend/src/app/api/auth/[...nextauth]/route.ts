import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Call your backend API to authenticate
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            console.error("Login failed:", await response.text());
            return null;
          }

          const data = await response.json();

          // Return the user object and token
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.fullName,
            image: data.user.avatarUrl,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        // Add custom properties to session
        session.user.id = token.sub as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        // Add user information to the token
        token.accessToken = account.access_token || user.accessToken;
      }
      return token;
    },

    async signIn({ account, profile }) {
      console.log(account);
      console.log(profile);
      return true;
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
