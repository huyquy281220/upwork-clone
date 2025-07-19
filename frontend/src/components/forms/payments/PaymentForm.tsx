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
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CreditCard, HelpCircle, Lock } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AddCardProps } from "@/types/payments";
import { attachPaymentMethod } from "@/services/stripe";
import { useSession } from "next-auth/react";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { useUser } from "@/hooks/useUserInfo";
import { BaseUser } from "@/types/user";
interface BillingDetails {
  cardHolderName: string;
  address: {
    country: string;
    line1: string;
    line2?: string;
    city: string;
    postal_code: string;
    state?: string;
  };
}

interface PaymentFormData {
  expirationMonth: string;
  expirationYear: string;
  billing_details: BillingDetails;
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
  const { data: session } = useSession();
  const { data: user } = useUser<BaseUser>(session?.user.id ?? "");
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<PaymentFormData>({
    expirationMonth: "",
    expirationYear: "",
    billing_details: {
      cardHolderName: "",
      address: {
        country: "VN",
        line1: "",
        line2: "",
        city: "",
        postal_code: "",
      },
    },
  });

  const mutation = useMutation({
    mutationFn: (data: AddCardProps) => {
      return attachPaymentMethod(data);
    },

    onSuccess: () => setStatus("success"),
    onError: () => setStatus("error"),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setStatus("loading");

    const cardElement = elements?.getElement(CardNumberElement);

    if (!cardElement) {
      setStatus("idle");
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(
        error.message ?? "Failed to save payment method. Please try again."
      );
      setStatus("error");
    }

    if (!paymentMethod) {
      setErrorMessage("Failed to create payment method");
      setStatus("error");
      return;
    }

    mutation.mutate({
      paymentMethodId: paymentMethod.id,
      customerId: user?.stripeCustomerId ?? "",
    });
  };

  const updateFormData = (field: string, value: string) => {
    if (field.startsWith("billing_details.address.")) {
      const addressField = field.replace("billing_details.address.", "");
      setFormData((prev) => ({
        ...prev,
        billing_details: {
          ...prev.billing_details,
          address: {
            ...prev.billing_details.address,
            [addressField]: value,
          },
        },
      }));
    } else if (field === "billing_details.cardHolderName") {
      setFormData((prev) => ({
        ...prev,
        billing_details: {
          ...prev.billing_details,
          cardHolderName: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  if (!session || !user) return <InfiniteLoading />;

  return (
    <Card className="w-full bg-transparent border-0 px-4 md:px-8">
      <CardContent className="px-0 py-9">
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
                  <p className="hidden md:block">Securely stored</p>
                </div>
              </div>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="cardHolderName"
                className="text-white font-medium"
              >
                Cardholder name
              </Label>
              <Input
                id="cardholderName"
                value={formData.billing_details.cardHolderName}
                onChange={(e) =>
                  updateFormData(
                    "billing_details.cardHolderName",
                    e.target.value
                  )
                }
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Expiration and Security Code */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col justify-end space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-white font-medium">
                  Expiration date
                </Label>
              </div>
              <div className="bg-gray-700 border border-gray-600 rounded-md px-3 py-[7px]">
                <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
              </div>
            </div>

            <div className="flex flex-col justify-end space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-white font-medium">Security code</Label>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="bg-gray-700 border border-gray-600 rounded-md px-3 py-[7px]">
                <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="space-y-4">
            <h3 className="text-white font-medium text-lg">Billing address</h3>

            <div className="space-y-2">
              <Label className="text-white font-medium">Country</Label>
              <Select
                value={formData.billing_details.address.country}
                onValueChange={(value) =>
                  updateFormData("billing_details.address.country", value)
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
                value={formData.billing_details.address.line1}
                onChange={(e) =>
                  updateFormData(
                    "billing_details.address.line1",
                    e.target.value
                  )
                }
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white font-medium">
                Address line 2 <span className="text-gray-400">(optional)</span>
              </Label>
              <Input
                value={formData.billing_details.address.line2}
                onChange={(e) =>
                  updateFormData(
                    "billing_details.address.line2",
                    e.target.value
                  )
                }
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white font-medium">City</Label>
                <Input
                  value={formData.billing_details.address.city}
                  onChange={(e) =>
                    updateFormData(
                      "billing_details.address.city",
                      e.target.value
                    )
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white font-medium">
                  Postal code <span className="text-gray-400">(optional)</span>
                </Label>
                <Input
                  value={formData.billing_details.address.postal_code}
                  onChange={(e) =>
                    updateFormData(
                      "billing_details.address.postal_code",
                      e.target.value
                    )
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {status === "success" && (
            <p className="text-green-500 font-medium">
              Payment method saved successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 font-medium">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!stripe || status === "loading"}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-md"
          >
            {status === "loading" ? "Processing..." : "Save"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
