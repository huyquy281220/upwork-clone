"use client";

import FreelancerLayout from "@/components/layouts/main-layout";
import { ChildrenProps } from "@/types";

export default function FreelancerLayoutWrapper({ children }: ChildrenProps) {
  return <FreelancerLayout>{children}</FreelancerLayout>;
}
