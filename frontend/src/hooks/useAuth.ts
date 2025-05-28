import { deleteAllCookies, setCookie } from "@/lib/cookie";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

interface SignInCredentials {
  email: string;
  password: string;
  redirect?: boolean;
  callbackUrl?: string;
}

interface LogoutOptions {
  redirectTo?: string;
  clearStorage?: boolean;
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const login = async ({
    email,
    password,
    redirect = false,
  }: SignInCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect,
        email,
        password,
        callbackUrl: "/auth-redirect",
      });

      if (result?.error) {
        setError(result.error);
        return {
          success: false,
          error: result.error,
        };
      }

      return {
        success: true,
      };
    } catch {
      const errorMessage = "An error occurred during sign in";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/auth-redirect",
        redirect: false,
      });

      if (session?.user) {
        setCookie("role", session.user.role);
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (options: LogoutOptions) => {
    const { redirectTo = "/", clearStorage = true } = options;

    setError(null);

    try {
      deleteAllCookies(["accessToken", "role"]);

      if (clearStorage && typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }

      await signOut({ callbackUrl: redirectTo, redirect: true });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // const getCallbackUrl = () => {
  //   const roleCookie =
  //     typeof document !== "undefined" ? getCookie("role") : null;

  //   if (roleCookie === "CLIENT") {
  //     return "/client";
  //   } else if (roleCookie === "FREELANCER") {
  //     return "/freelancer/find-work";
  //   } else {
  //     return "/";
  //   }
  // };

  return {
    login,
    loginWithGoogle,
    logout,
    isLoading,
    error,
    setError,
  };
}
