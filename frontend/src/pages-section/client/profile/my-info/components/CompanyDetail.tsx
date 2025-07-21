// import CirclePencil from "@/components/common/CirclePencil";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CompanyData {
  name: string;
}

const companyData: CompanyData = {
  name: "Huy Nguyen",
};

export function CompanyDetailsSection() {
  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Company details
        </h2>
        {/* <CirclePencil /> */}
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={"/placeholder.svg"} alt={companyData.name} />
          <AvatarFallback>
            {companyData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="font-medium text-foreground">{companyData.name}</div>
      </div>
    </div>
  );
}
