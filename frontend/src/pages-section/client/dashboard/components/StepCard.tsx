import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Mail, Smartphone } from "lucide-react";

export function ListCard({
  emailVerified,
  paymentVerified,
  phoneVerified,
}: {
  emailVerified: boolean;
  paymentVerified: boolean;
  phoneVerified: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {phoneVerified ? (
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-foreground" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Badge variant="secondary" className="text-xs bg-background">
                Required to publish a job
              </Badge>
              <h3 className="font-medium text-foreground underline cursor-pointer hover:no-underline">
                Verify your phone number
              </h3>
              <p className="text-sm text-muted-foreground">
                Confirm it&#39;s you to be able to publish your first job post.
              </p>
              {phoneVerified && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="w-4 h-4" />
                  Phone number verified
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {paymentVerified ? (
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-foreground" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Badge variant="secondary" className="text-xs bg-background">
                Required to hire
              </Badge>
              <h3 className="font-medium text-foreground underline cursor-pointer hover:no-underline">
                Add a billing method
              </h3>
              <p className="text-sm text-muted-foreground">
                This can increase your hiring speed by up to 3x. There&#39;s no
                cost until you hire.
              </p>

              {paymentVerified && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="w-4 h-4" />
                  Payment method verified
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {emailVerified ? (
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-foreground" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Badge variant="secondary" className="text-xs bg-background">
                Required to hire
              </Badge>
              <h3 className="font-medium text-foreground underline cursor-pointer hover:no-underline">
                Verify your email
              </h3>

              <p className="text-sm text-muted-foreground"></p>

              {emailVerified && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="w-4 h-4" />
                  Email address verified
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
