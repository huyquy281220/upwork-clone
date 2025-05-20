import SearchInput from "./SearchInput";
import UserAvatar from "./UserAvatar";
import HelpCenter from "./HelpCenter";
import Notification from "./Notification";

export default function RightSection() {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <SearchInput />
      <HelpCenter />
      <Notification />
      <UserAvatar />
    </div>
  );
}
