import CirclePencil from "@/components/common/CirclePencil";
import { Button } from "@/components/ui/button";

type JobCategoryProps = {
  title: string;
  onEdit?: () => void;
};

export function JobCategory({ title, onEdit }: JobCategoryProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">
          {title || "Enter your job title"}
        </h3>
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
