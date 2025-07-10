import CirclePencil from "@/components/common/CirclePencil";

interface ContactData {
  owner: string;
  phone: string;
  timezone: string;
  address: string;
}

const contactData: ContactData = {
  owner: "H***uyen",
  phone: "",
  timezone: "UTC+07:00 Bangkok, Jakarta, Hanoi",
  address: "Vietnam",
};

export function CompanyContactsSection() {
  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Company contacts
        </h2>
        <CirclePencil />
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Owner</div>
          <div className="font-medium text-foreground">{contactData.owner}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">Phone</div>
          <div className="font-medium text-foreground">
            {contactData.phone || "-"}
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">Time Zone</div>
          <div className="font-medium text-foreground">
            {contactData.timezone}
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">Address</div>
          <div className="font-medium text-foreground">
            {contactData.address}
          </div>
        </div>
      </div>
    </div>
  );
}
