import { StepCard } from "./components/StepCard";
import { Smartphone, CreditCard, Mail } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Verify your phone number",
    description: "Confirm it's you to be able to publish your first job post.",
    icon: Smartphone,
    status: "required",
    actionText: "Required to publish a job",
  },
  {
    id: 2,
    title: "Add a billing method",
    description:
      "This can increase your hiring speed by up to 3x. There's no cost until you hire.",
    icon: CreditCard,
    status: "required",
    actionText: "Required to hire",
  },
  {
    id: 3,
    title: "Email address verified",
    description: "",
    icon: Mail,
    status: "completed",
    actionText: "Required to hire",
  },
];

export function LastStepsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-foreground">
        Last steps before you can hire
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step) => (
          <StepCard
            key={step.id}
            {...step}
            status={step.status as "required" | "completed"}
          />
        ))}
      </div>
    </div>
  );
}
