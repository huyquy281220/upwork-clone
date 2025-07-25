"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { setCookie } from "@/lib/cookie";

export const dynamic = "force-dynamic";

export default function Loading() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/sign-in");
      return;
    }

    // Set role cookie after successful authentication
    setCookie("role", session.user.role);

    if (session.user.role === "CLIENT") {
      router.push("/client/dashboard");
    } else if (session.user.role === "FREELANCER") {
      router.push("/freelancer/find-work");
    } else {
      router.push("/");
    }
  }, [session, status, router]);

  return <InfiniteLoading />;
}
