import { Badge } from "@/components/ui/badge";

interface SkillsProps {
  skills: { id: string; name: string }[];
}

export function SkillsSection({ skills }: SkillsProps) {
  console.log(skills);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        Skills and Expertise
      </h3>
      <div>
        <p className="text-sm font-medium text-foreground mb-2">
          Mandatory skills
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-background text-foreground flex items-center gap-1 py-1.5 border border-gray-700"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
