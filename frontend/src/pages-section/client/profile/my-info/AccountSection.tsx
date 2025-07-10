import CirclePencil from "@/components/common/CirclePencil";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AccountData {
  username: string;
  role: string;
  fullName: string;
  email: string;
}

const accountData: AccountData = {
  username: "H***uyen",
  role: "Client Marketplace",
  fullName: "Huy Nguyen",
  email: "h***y@gmail.com",
};

export function AccountSection() {
  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Account</h2>
        <CirclePencil />
      </div>

      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={"/placeholder.svg"} alt={accountData.fullName} />
          <AvatarFallback>
            {accountData.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <div>
            <div className="font-medium text-foreground">
              {accountData.username}
            </div>
            <div className="text-sm text-muted-foreground">
              {accountData.role}
            </div>
          </div>
          <div>
            <div className="font-medium text-foreground">
              {accountData.fullName}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="font-medium text-foreground">
              {accountData.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
