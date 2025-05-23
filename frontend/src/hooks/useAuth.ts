import { signIn } from "next-auth/react";
import { useState } from "react";
import { getCookie } from "@/utils/cookies";

interface SignInCredentials {
  email: string;
  password: string;
  redirect?: boolean;
  callbackUrl?: string;
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      return {
        success: true,
        url: result?.url,
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

    if (roleCookie === "client") {
      return "/client";
    } else if (roleCookie === "freelancer") {
      return "/freelancer";
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
