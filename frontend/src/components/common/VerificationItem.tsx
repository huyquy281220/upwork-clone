import { CheckCircle, Circle } from "lucide-react";

interface VerificationItemProps {
  label: string;
  verified: boolean;
  subtitle?: string;
}

export function VerificationItem({
  label,
  verified,
  subtitle,
}: VerificationItemProps) {
  return (
    <div className="flex items-start gap-3">
      {verified ? (
        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
      ) : (
        <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium">{label}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
