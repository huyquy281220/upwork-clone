"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button onClick={() => router.back()}>Go back</Button>
    </div>
  );
}
