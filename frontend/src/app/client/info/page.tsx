export const dynamic = "force-dynamic";
import {
  MyInfoContent,
  SettingsSidebar,
} from "@/pages-section/client/profile/my-info";

export default function ClientProfile() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <SettingsSidebar />
        <MyInfoContent />
      </div>
    </div>
  );
}
