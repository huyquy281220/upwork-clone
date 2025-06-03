import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { SkillBadge } from "@/components/common/SkillBadge";

const skills = ["Web Application"];

export function SkillCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold">Skills</h3>
          <Pencil className="w-4 h-4 text-green-600 cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <SkillBadge key={index} skill={skill} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
