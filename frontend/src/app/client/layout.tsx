import "@/app/globals.css";
import { ChildrenProps } from "@/types";

export default function ClientLayoutWrapper({ children }: ChildrenProps) {
  return <>{children}</>;
}
