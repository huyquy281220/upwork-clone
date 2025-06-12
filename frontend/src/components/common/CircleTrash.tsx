import { Trash2 } from "lucide-react";

export default function CirclePencil({ onEdit }: { onEdit?: () => void }) {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border border-green-600"
      onClick={onEdit}
    >
      <Trash2 className="w-4 h-4 text-green-600" />
    </div>
  );
}
