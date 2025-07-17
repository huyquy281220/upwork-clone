"use client";

import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { Role } from "@/types/user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const { data: session, status } = useSession();
  const [redirectUrl, setRedirectUrl] = useState("/client");

  useEffect(() => {
    if (session?.user.role === Role.FREELANCER) {
      setRedirectUrl("/freelancer/find-work");
    } else {
      setRedirectUrl("/client/dashboard");
    }
  }, [session]);

  if (status === "loading") return <InfiniteLoading />;

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={redirectUrl}>Return Home</Link>
    </div>
  );
}
