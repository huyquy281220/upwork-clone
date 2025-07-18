import { AccountSection } from "./components/AccountSection";
import { CompanyDetailsSection } from "./components/CompanyDetail";
import { CompanyContactsSection } from "./components/CompanyContract";

export function MyInfoContent() {
  return (
    <div className="flex-1 p-8 ">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            My Info
          </h1>
          <p className="text-muted-foreground">This is a client account</p>
        </div>

        <div className="space-y-6">
          <AccountSection />
          <CompanyDetailsSection />
          <CompanyContactsSection />
        </div>
      </div>
    </div>
  );
}
