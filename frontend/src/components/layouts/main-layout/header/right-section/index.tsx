import { SearchInput } from "./SearchInput";
import { IconButtons } from "./IconButtons";
import { UserAvatar } from "./UserAvatar";

export const RightSection = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <SearchInput />
      <IconButtons />
      <UserAvatar />
    </div>
  );
};
