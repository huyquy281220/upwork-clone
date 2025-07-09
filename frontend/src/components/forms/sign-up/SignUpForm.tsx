"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCountries } from "@/hooks/useCountries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Resolver } from "react-hook-form";
import { getCookie } from "@/lib/cookie";
import { useAuth } from "@/hooks/useAuth";

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      "Password must contain at least one uppercase letter and one special character"
    ),
  address: z.string().min(1, "Please select a country"),
  emailUpdates: z.boolean().default(true),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms of service",
  }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignupForm() {
  const router = useRouter();
  const countries = useCountries();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();
  // const onSubmit: SubmitHandler<SignUpFormValues> = (data) => console.log(data);

  const countryNames = countries?.map((country) => country.name.common);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema) as Resolver<SignUpFormValues>,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      emailUpdates: true,
      agreeTerms: false,
    },
  });

  const agreeTerms = watch("agreeTerms", false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const onFormSubmit = async (data: SignUpFormValues) => {
    clearErrors("root");

    try {
      const selectedRole = getCookie("role");

      if (!selectedRole) {
        setError("root", {
          type: "manual",
          message:
            "Please select a role first. Redirecting to role selection...",
        });
        setTimeout(() => {
          router.push("/sign-up/select-role");
        }, 2000);
        return;
      }

      const role = selectedRole.toUpperCase() as "CLIENT" | "FREELANCER";

      // 1. Register user directly with the backend API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            fullName: `${data.firstName} ${data.lastName}`,
            address: data.address,
            role: role,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Registration failed";

        setError("root", {
          type: "manual",
          message: errorMessage,
        });
        return;
      }

      const signInResponse = await login({
        redirect: true,
        email: data.email,
        password: data.password,
      });

      if (signInResponse?.error) {
        setError("root", {
          type: "manual",
          message: signInResponse.error || "Sign in failed after registration",
        });
        return;
      }

      // const redirectUrl =
      //   signInResponse?.url ||
      //   (role === "CLIENT" ? "/client" : "/freelancer/find-work");
      // router.push(redirectUrl);
    } catch (error) {
      console.error("Signup error:", error);
      setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full space-y-4">
      {/* Display root errors (general form errors) */}
      {errors.root && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {errors.root.message}
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First name
          </label>
          <input
            id="firstName"
            {...register("firstName")}
            type="text"
            autoComplete="given-name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last name
          </label>
          <input
            id="lastName"
            {...register("lastName")}
            type="text"
            autoComplete="family-name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          {...register("email", {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          type="email"
          autoComplete="email"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Password (8 or more characters)"
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={isSubmitting}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Country
        </label>
        <div className="relative">
          <select
            id="address"
            {...register("address")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          >
            <option value="">Select a country</option>
            {countryNames?.sort().map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            size={20}
          />
        </div>
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <div>
            <input
              {...register("agreeTerms")}
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 custom-checkbox"
              disabled={isSubmitting}
            />
          </div>
          <span className="text-sm text-gray-700">
            Yes, I understand and agree to the{" "}
            <Link href="#" className="text-green-600 hover:underline">
              Upwork Terms of Service
            </Link>
            , including the{" "}
            <Link href="#" className="text-green-600 hover:underline">
              User Agreement
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-green-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.agreeTerms && (
          <p className="mt-1 text-sm text-red-600">
            {errors.agreeTerms.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting || !agreeTerms}
      >
        {isSubmitting ? "Creating account..." : "Create my account"}
      </button>
    </form>
  );
}
