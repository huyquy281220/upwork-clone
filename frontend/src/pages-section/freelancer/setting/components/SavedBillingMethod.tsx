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
    if (!cardNumber) return "";
    const cleaned = cardNumber.replace(/\s/g, "");
    if (cleaned.length >= 8) {
      const first4 = cleaned.slice(0, 4);
      const last4 = cleaned.slice(-4);
      return `${first4} **** **** ${last4}`;
    }
    return `**** **** **** ${cleaned.slice(-4)}`;
  };

  return (
    <div className="space-y-4">
      {methods.map((method) => (
        <Card key={method.id} className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">
                    {method.type === "card" ? "Payment Card" : "PayPal"}
                  </p>
                  {method.type === "card" && (
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="font-mono">
                        {formatCardNumber(method.cardNumber || "")}
                      </p>
                      <p>{method.cardholderName}</p>
                      {method.expirationMonth && method.expirationYear && (
                        <p>
                          Exp: {method.expirationMonth}/{method.expirationYear}
                        </p>
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
      ))}
    </div>
  );
}
