"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import CirclePencil from "@/components/common/CirclePencil";
import { useState } from "react";
import { PaymentForm } from "@/components/forms/payments/PaymentForm";

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "Visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: "2",
    type: "Mastercard",
    last4: "5555",
    expiryMonth: 8,
    expiryYear: 2024,
    isDefault: false,
  },
];

export function BillingPaymentsContent() {
  const [openPaymentForm, setOpenPaymentForm] = useState(false);

  return (
    <div className="max-w-4xl px-6 lg:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          Billing & Payments
        </h1>
        <p className="text-muted-foreground">
          Manage your payment methods and billing history
        </p>
      </div>

      <div className="space-y-6">
        {/* Payment Methods Section */}
        <Card>
          <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-6 p-8">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-foreground">
                Payment Methods
              </h2>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setOpenPaymentForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>

          <div className="space-y-4 px-4 md:px-8 pb-6 border-b">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-4 border border-border rounded-lg"
              >
                <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {method.type} •••• {method.last4}
                      </span>
                      {method.isDefault && (
                        <Badge
                          variant="secondary"
                          className="text-muted-foreground"
                        >
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expires {method.expiryMonth.toString().padStart(2, "0")}/
                      {method.expiryYear}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CirclePencil />
                  <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => onDelete(method.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {openPaymentForm && <PaymentForm />}
        </Card>
      </div>
    </div>
  );
}
