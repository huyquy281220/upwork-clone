import CirclePencil from "@/components/common/CirclePencil";
import { EditAccountInfo } from "@/components/modals/client";
import ImageUploadModal from "@/components/modals/freelancer/ImageUploadModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AccountData = {
  fullName: string;
  email: string;
  avatar: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  isOpenAvatar: boolean;
  onCloseAvatar: () => void;
  onOpenAvatar: () => void;
};

export function AccountSection({
  fullName,
  email,
  avatar,
  isOpen,
  onClose,
  onOpen,
  isOpenAvatar,
  onCloseAvatar,
  onOpenAvatar,
}: AccountData) {
  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Account</h2>
        <CirclePencil onEdit={onOpen} />
      </div>

      <div>
        <Avatar className="w-[5.5rem] h-[5.5rem] relative overflow-visible mb-2">
          <AvatarImage
            src={avatar || "/placeholder.svg"}
            alt={fullName}
            className="rounded-full object-cover object-center"
          />
          <AvatarFallback>
            {fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
          <div className="absolute bottom-0 right-0">
            <CirclePencil onEdit={onOpenAvatar} classes="bg-background" />
          </div>
        </Avatar>
        <div className="flex-1 space-y-3">
          <div>
            <div className="font-medium text-foreground">{fullName}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="font-medium text-foreground">{email}</div>
          </div>
        </div>
      </div>

      <EditAccountInfo
        isOpen={isOpen}
        onClose={onClose}
        fullName={fullName}
        email={email}
      />
      <ImageUploadModal open={isOpenAvatar} onOpenChange={onCloseAvatar} />
    </div>
  );
}
