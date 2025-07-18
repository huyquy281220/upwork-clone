"use client";

import { CreditCard, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CardInfo } from "../Billing";

interface SavedBillingMethodsProps {
  methods: CardInfo[];
  onDelete: (id: string) => void;
}

export function SavedBillingMethods({
  methods,
  onDelete,
}: SavedBillingMethodsProps) {
  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return "**** **** **** ****";
    const cleaned = cardNumber.replace(/\s/g, "");
    const last4 = cleaned.slice(-4);
    return `**** **** **** ${last4}`;
  };

  const getCardBrand = (cardNumber: string) => {
    if (!cardNumber) return "Card";
    const cleaned = cardNumber.replace(/\s/g, "");
    if (cleaned.startsWith("4")) return "Visa";
    if (cleaned.startsWith("5") || cleaned.startsWith("2")) return "Mastercard";
    if (cleaned.startsWith("3")) return "American Express";
    return "Card";
  };

  const getCardIcon = (brand: string) => {
    switch (brand) {
      case "Visa":
        return (
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
        );
      case "Mastercard":
        return (
          <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          </div>
        );
      case "American Express":
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
        const cardBrand = getCardBrand(method.cardNumber || "");

        return (
          <Card key={method.id} className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getCardIcon(cardBrand)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">
                        {cardBrand}
                      </span>
                      <span className="font-mono text-sm text-muted-foreground">
                        {formatCardNumber(method.cardNumber || "")}
                      </span>
                    </div>
                    {method.expirationMonth && method.expirationYear && (
                      <p className="text-xs text-muted-foreground">
                        Expires {method.expirationMonth}/{method.expirationYear}
                      </p>
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
