import { signIn } from "next-auth/react";
import { useState } from "react";

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
    callbackUrl = "/",
  }: SignInCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect,
        email,
        password,
        callbackUrl,
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

  const loginWithGoogle = (callbackUrl = "/") => {
    return signIn("google", { callbackUrl });
  };

  return {
    login,
    loginWithGoogle,
    isLoading,
    error,
  };
}
