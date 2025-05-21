"use client";

import FreelancerLayout from "@/components/layouts";
import { ChildrenProps } from "@/types";

export default function FreelancerLayoutWrapper({ children }: ChildrenProps) {
  return <FreelancerLayout>{children}</FreelancerLayout>;
}
