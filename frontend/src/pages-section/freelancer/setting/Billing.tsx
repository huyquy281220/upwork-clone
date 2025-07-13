"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddBillingMethodForm } from "./components/AddBillingMethod";

export function BillingContent() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Billing & payments
      </h1>

      <div className="bg-card border border-border rounded-lg p-6">
        {showAddForm ? (
          <AddBillingMethodForm onCancel={() => setShowAddForm(false)} />
        ) : (
          <>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Billing methods
            </h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              You haven&#39;t set up any billing methods yet. Your billing
              method will be charged only when your available balance from
              Upwork earnings is not sufficient to pay for your monthly
              membership and/or Connects.
            </p>

            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add a billing method
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
