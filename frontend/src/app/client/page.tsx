"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllJobsByUserId } from "@/services/jobs";
import { useSession } from "next-auth/react";

export default function ClientPage() {
  const { data: session } = useSession();
  useQuery({
    queryKey: ["jobs"],
    queryFn: () => getAllJobsByUserId(session?.user.id ?? ""),
    enabled: !!session?.user.id,
  });

  return <div>ClientPage</div>;
}
