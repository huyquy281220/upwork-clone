"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StripeElementWrapper from "@/providers/StripeElementWrapper";
import { useUser } from "@/hooks/useUserInfo";
import { useSession } from "next-auth/react";
import { createOnboardLink, getDetailedAccountInfo } from "@/services/stripe";
import { BaseUser } from "@/types/user";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { SavedBillingMethods } from "./components/SavedBillingMethod";
import { useQuery } from "@tanstack/react-query";
import { StripeExternalAccount } from "@/types/stripe";
import { CardInfo } from "@/types/stripe";

export function BillingContent() {
  const { data: session, status } = useSession();
  const { data: user } = useUser<BaseUser>(session?.user.id ?? "");

  const { data: detailedAccountInfo, isLoading } = useQuery({
    queryKey: ["detailedAccountInfo", user?.stripeAccountId],
    queryFn: () => getDetailedAccountInfo(user?.stripeAccountId ?? ""),
    enabled: !!user?.stripeAccountId,
  });

  // Transform Stripe external accounts to CardInfo format
  const paymentMethods: CardInfo[] =
    detailedAccountInfo?.externalAccounts?.map(
      (account: StripeExternalAccount) => ({
        id: account.id,
        type: account.object, // 'card' or 'bank_account'
        // Card fields
        brand: account.brand,
        last4: account.last4,
        exp_month: account.exp_month,
        exp_year: account.exp_year,
        // Bank account fields
        bank_name: account.bank_name,
        account_holder_type: account.account_holder_type,
        account_type: account.account_type,
        routing_number: account.routing_number,
        fingerprint: account.fingerprint,
        status: account.status,
      })
    ) || [];

  const handleAddPayoutMethod = async () => {
    try {
      const res = await createOnboardLink(
        user?.stripeAccountId ?? "",
        user?.email ?? ""
      );
      window.open(res, "_blank");
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading") return <InfiniteLoading />;
  if (!session || !user) return <InfiniteLoading />;

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

          {isLoading ? (
            <InfiniteLoading />
          ) : paymentMethods.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your verified payout methods:
              </p>
              <div className="flex flex-col gap-4 mb-8">
                <SavedBillingMethods
                  methods={paymentMethods}
                  onDelete={() => {}}
                />
              </div>
            </>
          ) : (
            <p className="text-muted-foreground mb-6 leading-relaxed">
              You haven&#39;t set up any payout methods yet. Please add a payout
              method to receive your earnings.
            </p>
          )}

          <Button
            onClick={handleAddPayoutMethod}
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
