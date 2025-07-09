import { ListCard } from "./components/StepCard";

type LastStepsSectionProps = {
  phoneVerified: boolean;
  paymentVerified: boolean;
  emailVerified: boolean;
};

export function LastStepsSection({
  emailVerified,
  paymentVerified,
  phoneVerified,
}: LastStepsSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-foreground">
        Last steps before you can hire
      </h2>
      <ListCard
        emailVerified={emailVerified}
        phoneVerified={phoneVerified}
        paymentVerified={paymentVerified}
      />
    </div>
  );
}
