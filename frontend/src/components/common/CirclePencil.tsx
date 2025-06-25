import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

export default function CirclePencil({
  onEdit,
  classes,
}: {
  onEdit?: () => void;
  classes?: string;
}) {
  return (
    <div
      className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border border-green-600",
        classes ?? ""
      )}
      onClick={onEdit}
    >
      <Pencil className="w-3 h-3 text-green-600" />
    </div>
  );
}
