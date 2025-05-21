import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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
          throw new Error("Email and password are required");
        }

        try {
          // Call your backend API to authenticate
          const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

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

    async signIn({ user, account }) {
      // Handle Google sign-in
      if (account?.provider === "google") {
        try {
          // Gọi API từ backend để xử lý đăng nhập Google
          const response = await fetch(`${API_URL}/auth/google-signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              // image: user.image,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Google sign-in failed:", errorData);
            return false;
          }

          const userData = await response.json();

          // Cập nhật thông tin user từ phản hồi API
          user.id = userData.id;
          // user.role = userData.role;

          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }

      return true;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
