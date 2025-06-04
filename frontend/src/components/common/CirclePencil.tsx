import { Pencil } from "lucide-react";

export default function CirclePencil() {
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border border-green-600">
      <Pencil className="w-3 h-3 text-green-600" />
    </div>
  );
}
