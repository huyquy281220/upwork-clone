import StripeElementWrapper from "@/providers/StripeElementWrapper";
import { ChildrenProps } from "@/types";

export default function ClientInfoLayout({ children }: ChildrenProps) {
  return <StripeElementWrapper>{children}</StripeElementWrapper>;
}
