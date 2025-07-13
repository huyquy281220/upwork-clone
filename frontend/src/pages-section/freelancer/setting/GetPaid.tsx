import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function GetPaidContent() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-foreground mb-8">Get Paid</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">$2,450.00</p>
                <p className="text-muted-foreground">
                  Available for withdrawal
                </p>
              </div>
              <Button className="text-white">Withdraw Funds</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Bank Account</p>
                  <p className="text-muted-foreground">****1234</p>
                </div>
                <Badge variant="secondary" className="text-muted">
                  Primary
                </Badge>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
