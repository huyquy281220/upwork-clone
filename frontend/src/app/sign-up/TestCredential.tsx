"use client";
import { useSession } from "next-auth/react";

export const Test = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <div>{status}</div>
    </div>
  );
};
