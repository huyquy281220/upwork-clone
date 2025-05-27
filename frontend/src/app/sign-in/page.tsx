"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { GoogleSvg } from "@/assets/svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Resolver } from "react-hook-form";

// Define validation schema using Zod
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { login, loginWithGoogle, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema) as Resolver<SignInFormValues>,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    await login({
      email: data.email,
      password: data.password,
      redirect: true,
    });
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/upwork-logo.svg"
            alt="Upwork"
            width={100}
            height={30}
            className="h-8 w-auto"
          />
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-green-700 hover:underline text-sm">
            Here to hire talent?
          </Link>
          <Link
            href="#"
            className="text-green-700 hover:underline font-medium text-sm"
          >
            Join as a Client
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md px-4 py-8">
        <h1 className="text-3xl font-medium text-gray-800 mb-8 text-center">
          Log in to Upwork
        </h1>

        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="w-full flex flex-col gap-4 mb-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition-colors"
          >
            <Image
              src={GoogleSvg}
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="flex-grow text-center text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>
        </div>

        <div className="w-full flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Sign In Form with react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              autoComplete="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password")}
              type="password"
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                {...register("rememberMe")}
                type="checkbox"
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-green-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700  font-medium py-3 px-4 rounded-md mt-6"
          >
            {isLoading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Don&apos;t have an Upwork account?{" "}
          <Link
            href="/sign-up"
            className="text-green-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </main>
    </div>
  );
}
