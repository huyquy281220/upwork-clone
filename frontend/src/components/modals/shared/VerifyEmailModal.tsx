"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { verifyEmail } from "@/services/userService";

interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export default function VerifyEmailModal({
  isOpen,
  email,
  onClose,
}: VerifyEmailModalProps) {
  const handleVerifyEmail = async (email: string) => {
    onClose();
    await verifyEmail(email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full sm:max-w-xl bg-gray-900 border-gray-700 text-foreground"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className="pb-4">
          <p className="text-foreground text-2xl text-center">
            Your email is not verified
          </p>
          <p className="text-foreground text-2xl text-center">
            <span
              className="text-green-500 underline underline-offset-4 cursor-pointer"
              onClick={() => handleVerifyEmail(email)}
            >
              Click here
            </span>{" "}
            to verify your email.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
