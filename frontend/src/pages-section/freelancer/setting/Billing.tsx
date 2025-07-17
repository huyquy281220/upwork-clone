"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StripeElementWrapper from "@/providers/StripeElementWrapper";
// import { SavedBillingMethods } from "./components/SavedBillingMethod";

// export interface CardInfo {
//   id: string;
//   type: "card" | "paypal";
//   cardNumber?: string;
//   cardholderName?: string;
//   expirationMonth?: string;
//   expirationYear?: string;
// }

export function BillingContent() {
  return (
    <StripeElementWrapper>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Payout methods
        </h1>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Payout methods
          </h2>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            You haven&#39;t set up any payout methods yet. Please add a payout
            method to receive your earnings.
          </p>

          {/* <SavedBillingMethods /> */}

          <Button
            // onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add payout method
          </Button>
        </div>
      </div>
    </StripeElementWrapper>
  );
}
