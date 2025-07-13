"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CardCvcElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CreditCard, HelpCircle, Lock } from "lucide-react";
import { useState } from "react";

interface BillingAddress {
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode?: string;
}

interface PaymentFormData {
  firstName: string;
  lastName: string;
  expirationMonth: string;
  expirationYear: string;
  billingAddress: BillingAddress;
}

const COUNTRIES = [
  { code: "VN", name: "Vietnam" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
];
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#f9fafb",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
};

export function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PaymentFormData>({
    firstName: "Hai",
    lastName: "Hai",
    expirationMonth: "",
    expirationYear: "",
    billingAddress: {
      country: "VN",
      addressLine1: "",
      addressLine2: "",
      city: "Hanoi",
      postalCode: "000084",
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      setIsLoading(false);
      return;
    }

    // Here you would typically create a payment method and handle the payment
    // For demo purposes, we'll just log the form data
    console.log("Form data:", formData);

    setIsLoading(false);
  };

  const updateFormData = (field: string, value: string) => {
    if (field.startsWith("billingAddress.")) {
      const addressField = field.replace("billingAddress.", "");
      setFormData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-subBackground border-gray-700">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Number */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="card-number" className="text-white font-medium">
                  Card number
                </Label>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    </div>
                    <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      AE
                    </div>
                    <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center">
                      D
                    </div>
                    <div className="w-8 h-5 bg-blue-400 rounded text-white text-xs flex items-center justify-center">
                      DC
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="flex items-center bg-gray-700 border border-gray-600 rounded-md px-3 py-3">
                  <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                  <div className="flex items-center text-gray-400 text-sm ml-3">
                    <Lock className="w-4 h-4 mr-1" />
                    Securely stored
                  </div>
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white font-medium">
                  First name
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white font-medium">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Expiration and Security Code */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-white font-medium">
                  Expiration month
                </Label>
                <Input
                  placeholder="MM"
                  value={formData.expirationMonth}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                    if (
                      value === "" ||
                      (Number.parseInt(value) >= 1 &&
                        Number.parseInt(value) <= 12)
                    ) {
                      updateFormData("expirationMonth", value);
                    }
                  }}
                  maxLength={2}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white font-medium">
                  Expiration year
                </Label>
                <Input
                  placeholder="YY"
                  value={formData.expirationYear}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                    updateFormData("expirationYear", value);
                  }}
                  maxLength={2}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Label className="text-white font-medium">
                    Security code
                  </Label>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <div className="bg-gray-700 border border-gray-600 rounded-md px-3 py-3">
                  <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="space-y-4">
              <h3 className="text-white font-medium text-lg">
                Billing address
              </h3>

              <div className="space-y-2">
                <Label className="text-white font-medium">Country</Label>
                <Select
                  value={formData.billingAddress.country}
                  onValueChange={(value) =>
                    updateFormData("billingAddress.country", value)
                  }
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {COUNTRIES.map((country) => (
                      <SelectItem
                        key={country.code}
                        value={country.code}
                        className="text-white"
                      >
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white font-medium">Address line 1</Label>
                <Input
                  value={formData.billingAddress.addressLine1}
                  onChange={(e) =>
                    updateFormData(
                      "billingAddress.addressLine1",
                      e.target.value
                    )
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white font-medium">
                  Address line 2{" "}
                  <span className="text-gray-400">(optional)</span>
                </Label>
                <Input
                  value={formData.billingAddress.addressLine2}
                  onChange={(e) =>
                    updateFormData(
                      "billingAddress.addressLine2",
                      e.target.value
                    )
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-medium">City</Label>
                  <Input
                    value={formData.billingAddress.city}
                    onChange={(e) =>
                      updateFormData("billingAddress.city", e.target.value)
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-medium">
                    Postal code{" "}
                    <span className="text-gray-400">(optional)</span>
                  </Label>
                  <Input
                    value={formData.billingAddress.postalCode}
                    onChange={(e) =>
                      updateFormData(
                        "billingAddress.postalCode",
                        e.target.value
                      )
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!stripe || isLoading}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-md"
            >
              {isLoading ? "Processing..." : "Save"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
