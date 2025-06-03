import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  skill: string;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="bg-muted hover:bg-muted/80 rounded-full"
    >
      {skill}
    </Badge>
  );
}
