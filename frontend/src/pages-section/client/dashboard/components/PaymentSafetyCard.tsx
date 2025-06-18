import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PaymentSafetyCardProps {
  category: string;
  title: string;
  illustration: string;
}

function PaymentCardsIllustration() {
  return (
    <div className="relative w-20 h-16">
      {/* Credit cards stack */}
      <div className="absolute top-0 left-0 w-12 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-md transform rotate-12"></div>
      <div className="absolute top-1 left-2 w-12 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-md transform rotate-6"></div>
      <div className="absolute top-2 left-4 w-12 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-md"></div>
      {/* Lock icon */}
      <div className="absolute bottom-0 right-0 w-6 h-6 bg-gray-700 rounded-sm flex items-center justify-center">
        <div className="w-3 h-3 border-2 border-yellow-400 rounded-full"></div>
      </div>
    </div>
  );
}

function BillingSetupIllustration() {
  return (
    <div className="relative w-20 h-16">
      {/* Credit cards */}
      <div className="absolute top-0 left-0 w-12 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-md"></div>
      <div className="absolute top-2 left-2 w-12 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md"></div>
      {/* Arrow */}
      <div className="absolute top-4 right-0 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded transform rotate-45"></div>
      <div className="absolute top-6 right-2 w-3 h-1 bg-purple-400"></div>
    </div>
  );
}

function SafetyPeopleIllustration() {
  return (
    <div className="relative w-20 h-16">
      {/* People figures */}
      <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
      <div className="absolute top-0 left-6 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
      <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
      {/* Bodies */}
      <div className="absolute top-3 left-0 w-4 h-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-b-full"></div>
      <div className="absolute top-3 left-6 w-4 h-6 bg-gradient-to-br from-green-300 to-blue-400 rounded-b-full"></div>
      <div className="absolute top-3 right-0 w-4 h-6 bg-gradient-to-br from-pink-300 to-purple-400 rounded-b-full"></div>
      {/* Shield/safety elements */}
      <div className="absolute bottom-0 left-8 w-4 h-4 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-80"></div>
      <div className="absolute bottom-2 right-4 w-3 h-3 bg-gradient-to-br from-blue-400 to-green-500 rounded-full opacity-80"></div>
    </div>
  );
}

export function PaymentSafetyCard({
  category,
  title,
  illustration,
}: PaymentSafetyCardProps) {
  const renderIllustration = () => {
    switch (illustration) {
      case "payment-cards":
        return <PaymentCardsIllustration />;
      case "billing-setup":
        return <BillingSetupIllustration />;
      case "safety-people":
        return <SafetyPeopleIllustration />;
      default:
        return <div className="w-20 h-16 bg-muted rounded-lg"></div>;
    }
  };

  return (
    <Card className="bg-card border-border hover:border-muted-foreground/20 transition-colors cursor-pointer">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Badge
            variant="secondary"
            className="text-xs font-medium bg-background"
          >
            {category}
          </Badge>

          <h3 className="text-lg font-medium text-foreground leading-tight">
            {title}
          </h3>

          <div className="flex justify-end">{renderIllustration()}</div>
        </div>
      </CardContent>
    </Card>
  );
}
