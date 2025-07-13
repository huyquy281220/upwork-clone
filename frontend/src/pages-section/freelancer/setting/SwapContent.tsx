import type { SettingsSection } from "./SettingsPage";
import { BillingContent } from "./Billing";
import { ContactInfoContent } from "./ContactInfo";
import { GetPaidContent } from "./GetPaid";
import { PasswordSecurityContent } from "./PwdAndSecurity";

interface SwapContentProps {
  activeSection: SettingsSection;
}

export function SwapContent({ activeSection }: SwapContentProps) {
  switch (activeSection) {
    case "billing-payments":
      return <BillingContent />;
    case "contact-info":
      return <ContactInfoContent />;
    case "get-paid":
      return <GetPaidContent />;
    case "password-security":
      return <PasswordSecurityContent />;
    default:
      return <BillingContent />;
  }
}
