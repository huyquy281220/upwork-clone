import type { SettingsSection } from "./SettingPage";
import { MyInfoContent } from "./MyInfo";
import { PasswordSecurityContent } from "./PwdAndSecuroty";
import { BillingPaymentsContent } from "./BillingAndPayments";

interface SwapContentProps {
  activeSection: SettingsSection;
}

export function SwapContent({ activeSection }: SwapContentProps) {
  switch (activeSection) {
    case "my-info":
      return <MyInfoContent />;
    case "billing":
      return <BillingPaymentsContent />;
    case "password-security":
      return <PasswordSecurityContent />;
    default:
      return <MyInfoContent />;
  }
}
