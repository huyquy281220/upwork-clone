import CirclePencil from "@/components/common/CirclePencil";
import { Button } from "@/components/ui/button";

type JobCategoryProps = {
  category: string;
  onEdit?: () => void;
};

export function JobCategory({ category, onEdit }: JobCategoryProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-foreground">Category</h3>
          <h3 className="text-lg font-medium text-foreground">{category}</h3>
        </div>
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-green-500 hover:bg-transparent"
          >
            <CirclePencil />
          </Button>
        )}
      </div>
    </div>
  );
}
