"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { FormData } from "@/types";
import { useSignup } from "@/hooks/useSignup";
import { useRouter } from "next/navigation";

interface SignupFormProps {
  onSubmit?: (data: FormData) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const router = useRouter();
  const { signup, isLoading, error } = useSignup();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "Vietnam",
    emailUpdates: true,
    agreeTerms: false,
  });
  const [formError, setFormError] = useState<string | null>(null);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear any errors when user makes changes
    setFormError(null);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // If an onSubmit prop is provided, call it
    if (onSubmit) {
      onSubmit(formData);
      return;
    }

    try {
      const result = await signup({
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName} ${formData.lastName}`,
        role: "FREELANCER", // Default role, could be made configurable
      });

      if (result.success) {
        router.push(result.callbackUrl || "/");
      } else {
        setFormError(result.message);
      }
    } catch {
      setFormError("An unexpected error occurred during signup");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {(formError || error) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {formError || error}
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
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
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
      </div>

      <div className="mb-4">
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
          value={formData.email}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password (8 or more characters)"
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            minLength={8}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Country
        </label>
        <div className="relative">
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="Vietnam">Vietnam</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="emailUpdates"
            checked={formData.emailUpdates}
            onChange={handleCheckboxChange}
            className="mt-1 h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">
            Send me helpful emails to find rewarding work and job leads.
          </span>
        </label>
      </div>

      <div className="mb-6">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleCheckboxChange}
            className="mt-1 h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
            required
          />
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
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create my account"}
      </button>
    </form>
  );
}
