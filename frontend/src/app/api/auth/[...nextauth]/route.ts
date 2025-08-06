import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

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
          const response = await fetch(`${API_URL}/auth/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
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

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.fullName,
            // image: data.user.avatarUrl,
            accessToken: data.accessToken,
            role: data.user.role,
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
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
      }

      return session;
    },
    async jwt({ token, user, account }) {
      console.log("account", account);
      console.log("user", user);
      console.log("token", token);
      if (account && user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = account.access_token || user.accessToken;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
      }

      const isExpired = Date.now() > (token.expiresAt as number);

      if (!isExpired) return token;

      // Refresh token
      try {
        const res = await fetch(`${API_URL}/auth/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });

        const refreshed = await res.json();
        console.log(refreshed);
        token.accessToken = refreshed.accessToken;
        token.refreshToken = refreshed.refreshToken ?? token.refreshToken;
        token.expiresAt = Date.now() + refreshed.expiresIn * 1000;

        return token;
      } catch (err) {
        console.error("Refresh token failed:", err);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    async signIn({ user, account }) {
      const cookieStore = await cookies();
      // Handle Google sign-in
      if (account?.provider === "google") {
        try {
          const response = await fetch(`${API_URL}/auth/google-signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": `refresh_token=${
                account.access_token
              }; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
            },
            credentials: "include",
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              role: cookieStore.get("role")?.value,
              address: "",
              password: "",
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();

            return `/sign-in?error=GoogleAuthFailed&message=${encodeURIComponent(
              errorData.message || "Authentication failed"
            )}`;
          }

          const userData = await response.json();

          user.id = userData.user?.id || userData.id;
          user.role = userData.user?.role || userData.role;
          user.accessToken = userData.accessToken;

          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }

      return true;
    },
  },

  events: {
    async signOut({ token }) {
      try {
        // Get access token from the token
        const accessToken = token?.backendAccessToken;

        if (accessToken) {
          // Call backend API to clear refresh token
          const response = await fetch(`${API_URL}/auth/sign-out`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              id: token.id,
            }),
            credentials: "include",
          });

          if (response.ok) {
            console.log("✅ Backend sign-out successful");
          } else {
            console.warn("⚠️ Backend sign-out failed:", response.status);
          }
        } else {
          console.warn("⚠️ No access token available for backend sign-out");
        }
      } catch (error) {
        console.error("❌ Error during backend sign-out:", error);
      }
    },
  },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
});

export { handler as GET, handler as POST };
