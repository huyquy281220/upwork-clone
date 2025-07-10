import { Button } from "@/components/ui/button";

export function AccountActionsSection() {
  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          This is a client account
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Create New Account
        </Button>
        <Button variant="outline">Close account</Button>
        <Button variant="outline">Transfer Ownership</Button>
      </div>
    </div>
  );
}
