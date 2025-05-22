"use client";

import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/common/AspectRatio";
import { ClientSvg, FreelancerSvg } from "@/assets/svg";
import { useState } from "react";
import { useRoleStore } from "@/lib/store";
import { Logo } from "@/components/icons/Logo";
import { useRouter } from "next/navigation";
type Role = "client" | "freelancer";

const btnText: Record<Role, string> = {
  client: "Join as a Client",
  freelancer: "Apply as a Freelancer",
};

export default function SelectRole() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("client");
  const { setRole } = useRoleStore();

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
  };

  const handleCreateAccount = () => {
    if (!selectedRole) {
      alert("Please select a role to continue");
      return;
    }
    document.cookie = `role=${selectedRole}; path=/; max-age=3600`;
    setRole(selectedRole);
    router.push("/sign-up");
  };

  // setCookie("role", selectedRole);
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      {/* Logo */}
      <div className="w-full max-w-[1440px] mb-10">
        <div className="w-[102px] h-[28px]">
          <AspectRatio ratio={102 / 28}>
            <Logo />
          </AspectRatio>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-3xl flex flex-col items-center">
        <h1 className="text-[32px] mb-12 text-center font-normal ">
          Join as a client or freelancer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
          {/* Client Card */}
          <label className="relative cursor-pointer group">
            <input
              type="radio"
              name="role"
              className="peer sr-only"
              checked={selectedRole === "client"}
              onChange={() => handleRoleChange("client")}
            />
            <div className="p-6 border rounded-lg hover:border-[#108a00] peer-checked:border-[#108a00] peer-checked:border-2">
              <div className="mb-4">
                <div className="flex justify-between mr-4 mb-4">
                  <Image src={ClientSvg} alt="svg" />
                </div>
                <div>
                  <h2 className="text-[28px] leading-none font-medium mb-1 ">
                    I&apos;m a client, hiring for a project
                  </h2>
                </div>
              </div>
            </div>
          </label>

          {/* Freelancer Card */}
          <label className="relative cursor-pointer group">
            <input
              type="radio"
              name="role"
              className="peer sr-only"
              checked={selectedRole === "freelancer"}
              onChange={() => handleRoleChange("freelancer")}
            />
            <div className="p-6 border rounded-lg hover:border-[#108a00] peer-checked:border-[#108a00] peer-checked:border-2">
              <div className="mb-4">
                <div className="flex justify-between mr-4 mb-4">
                  <Image src={FreelancerSvg} alt="svg" />
                </div>
                <div>
                  <h2 className="text-[28px] leading-none font-medium mb-1 ">
                    I&apos;m a freelancer, looking for work
                  </h2>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Create Account Button */}
        <button
          type="button"
          onClick={handleCreateAccount}
          disabled={!selectedRole}
          className={`h-10 px-5 rounded-lg font-medium text-[14px] transition-colors ${
            selectedRole
              ? "bg-[#108a00]  hover:bg-[#14a800]"
              : "bg-[#e4eef3] text-[#37a000] cursor-not-allowed"
          }`}
        >
          <p className="text-[18px]">{btnText[selectedRole]}</p>
        </button>

        {/* Login Link */}
        <div className="mt-6  text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#108a00] underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
