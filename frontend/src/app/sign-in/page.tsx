"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { GoogleSvg } from "@/assets/svg";

export default function SignIn() {
  const router = useRouter();
  const { login, loginWithGoogle, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await login({
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result.success) {
      router.push(result.url || "/");
    }
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

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email address"
            />
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
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
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
