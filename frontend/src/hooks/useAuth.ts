import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { getCookie, setCookie } from "@/utils/cookies";

interface SignInCredentials {
  email: string;
  password: string;
  redirect?: boolean;
  callbackUrl?: string;
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const login = async ({
    email,
    password,
    redirect = false,
    callbackUrl,
  }: SignInCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect,
        email,
        password,
        callbackUrl: callbackUrl || getCallbackUrl(),
      });

      if (result?.error) {
        setError(result.error);
        return {
          success: false,
          error: result.error,
        };
      }

      if (session?.user.role) {
        setCookie("role", session.user.role);
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

  const loginWithGoogle = (callbackUrl = getCallbackUrl()) => {
    return signIn("google", { callbackUrl, redirect: false });
  };

  // Helper function to get callback URL based on role cookie
  const getCallbackUrl = () => {
    const roleCookie =
      typeof document !== "undefined" ? getCookie("role") : null;

    console.log(roleCookie);

    if (roleCookie === "CLIENT") {
      return "/client";
    } else if (roleCookie === "FREELANCER") {
      return "/freelancer/find-work";
    } else {
      return "/";
    }
  };

  return {
    login,
    loginWithGoogle,
    isLoading,
    error,
  };
}
