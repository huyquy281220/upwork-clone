import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserById } from "@/services/userService";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type EditAccountInfoProps = {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
  email: string;
};

export function EditAccountInfo({
  isOpen,
  onClose,
  fullName,
  email,
}: EditAccountInfoProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [newFullName, setNewFullName] = useState(fullName);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await updateUserById(session?.user.id ?? "", {
        fullName: newFullName,
      });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", session?.user.id],
      });

      setTimeout(() => {
        onClose();
      }, 1500);
    },
  });

  const handleSave = () => {
    mutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Account Info</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Full Name</Label>
            <Input
              defaultValue={fullName}
              onChange={(e) => setNewFullName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input defaultValue={email} disabled />
          </div>
        </div>
        <DialogFooter>
          <div className="mb-2">
            <p className="text-red-500">{mutation.error?.message}</p>
            <p className="text-green-500">
              {mutation.isSuccess ? "Update successfully" : ""}
            </p>
          </div>
          <Button onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
