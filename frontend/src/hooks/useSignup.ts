import { useState } from "react";
import { signIn } from "next-auth/react";

interface SignupData {
  email: string;
  password: string;
  fullName: string;
  role: "CLIENT" | "FREELANCER";
}

interface SignupError {
  message?: string;
}

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: SignupData, callbackUrl?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Register user directly with the backend API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // 2. If registration successful, sign in user
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl || "/",
      });

      if (signInResponse?.error) {
        throw new Error(
          signInResponse.error || "Sign in failed after registration"
        );
      }

      // 3. Return success info
      return {
        success: true,
        message: "Account created successfully",
        callbackUrl: signInResponse?.url,
      };
    } catch (err: unknown) {
      const error = err as Error | SignupError;
      const errorMessage =
        "message" in error ? error.message : "An error occurred during signup";
      setError(errorMessage || "An error occurred during signup");
      return {
        success: false,
        message: errorMessage || "An error occurred during signup",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
    error,
  };
}
