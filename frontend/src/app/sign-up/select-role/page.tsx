"use client";

import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/common/AspectRatio";
import { ClientSvg, FreelancerSvg } from "@/assets/svg";
import { useState } from "react";
import { Logo } from "@/components/icons/Logo";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookies";

type Role = "CLIENT" | "FREELANCER";

const btnText: Record<Role, string> = {
  CLIENT: "Join as a Client",
  FREELANCER: "Apply as a Freelancer",
};

export default function SelectRole() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("CLIENT");

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
  };

  const handleCreateAccount = () => {
    setCookie("role", selectedRole);
    router.replace("/sign-up");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
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
              checked={selectedRole === "CLIENT"}
              onChange={() => handleRoleChange("CLIENT")}
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
              checked={selectedRole === "FREELANCER"}
              onChange={() => handleRoleChange("FREELANCER")}
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
