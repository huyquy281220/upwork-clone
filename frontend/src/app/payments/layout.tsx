import StripeElementWrapper from "@/providers/StripeElementWrapper";
import { ChildrenProps } from "@/types";

export default function PaymentLayout({ children }: ChildrenProps) {
  return <StripeElementWrapper>{children}</StripeElementWrapper>;
}
