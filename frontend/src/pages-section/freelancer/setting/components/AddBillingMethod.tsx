"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Payment card",
    description: "Visa, Mastercard, American Express, Discover, Diners",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: (
      <div className="flex items-center">
        <span className="font-bold text-blue-600">Pay</span>
        <span className="font-bold text-blue-800">Pal</span>
      </div>
    ),
  },
];

interface AddBillingMethodFormProps {
  onCancel: () => void;
}

export function AddBillingMethodForm({ onCancel }: AddBillingMethodFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleCancel = () => {
    setSelectedMethod("");
    onCancel();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Add a billing method
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          className="text-green-600 border-green-600 bg-transparent"
        >
          Cancel
        </Button>
      </div>

      <div className="space-y-4">
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted/50 border border-border"
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">
                      {method.name}
                    </div>
                    {method.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {method.description}
                      </div>
                    )}
                  </div>
                  {method.icon && <div className="ml-4">{method.icon}</div>}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
}
