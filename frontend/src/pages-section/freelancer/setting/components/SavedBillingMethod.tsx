// ... existing imports ...

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CardInfo } from "@/types/stripe";
import { CreditCard, Landmark, Trash2 } from "lucide-react";

export function SavedBillingMethods({
  methods,
  onDelete,
}: {
  methods: CardInfo[];
  onDelete: (id: string) => void;
}) {
  const formatCardNumber = (method: CardInfo) => {
    if (method.type === "bank_account") {
      return `**** ${method.last4 || "****"}`;
    }
    return `**** **** **** ${method.last4 || "****"}`;
  };

  const getCardBrand = (method: CardInfo) => {
    if (method.type === "bank_account") {
      return method.bank_name || "Bank Account";
    }
    if (!method.brand) return "Card";
    return method.brand.charAt(0).toUpperCase() + method.brand.slice(1);
  };

  const getCardIcon = (method: CardInfo) => {
    if (method.type === "bank_account") {
      return <Landmark className="w-5 h-5 text-muted-foreground" />;
    }

    const brand = method.brand?.toLowerCase();
    switch (brand) {
      case "visa":
        return (
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
        );
      case "mastercard":
        return (
          <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          </div>
        );
      case "amex":
        return (
          <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
            AE
          </div>
        );
      default:
        return <CreditCard className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-3">
      {methods.map((method) => {
        const displayName = getCardBrand(method);

        return (
          <Card key={method.id} className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getCardIcon(method)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">
                        {displayName}
                      </span>
                      <span className="font-mono text-sm text-muted-foreground">
                        {formatCardNumber(method)}
                      </span>
                    </div>
                    {method.type === "card" &&
                      method.exp_month &&
                      method.exp_year && (
                        <p className="text-xs text-muted-foreground">
                          Expires {method.exp_month.toString().padStart(2, "0")}
                          /{method.exp_year.toString().slice(-2)}
                        </p>
                      )}
                    {method.type === "bank_account" && (
                      <div className="text-xs text-muted-foreground">
                        {method.account_holder_type && (
                          <span>{method.account_holder_type} account</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(method.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
