"use client";

import Image from "next/image";
import Link from "next/link";
import SignupForm from "@/components/sign-up/SignUpForm";
import { GoogleSvg } from "@/assets/svg";
import SwitchTheme from "@/components/common/SwitchTheme";
import { useAuth } from "@/hooks/useAuth";

export default function SignupPage() {
  const { loginWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    loginWithGoogle();
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Header */}
      <SwitchTheme />
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
          Sign up to find work you love
        </h1>

        {/* OAuth Buttons */}
        <div className="w-full flex flex-col gap-4 mb-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Image
              src={GoogleSvg}
              alt="Google"
              width={20}
              height={20}
              className="mr-2 bg-transparent"
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

        {/* Signup Form Component */}
        <SignupForm />

        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            href="/api/auth/signin"
            className="text-green-600 hover:underline font-medium"
          >
            Log In
          </Link>
        </p>
      </main>
    </div>
  );
}
