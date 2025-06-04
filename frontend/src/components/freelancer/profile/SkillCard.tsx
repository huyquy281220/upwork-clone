import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkillBadge } from "@/components/common/SkillBadge";
import CirclePencil from "@/components/common/CirclePencil";

const skills = ["Web Application"];

export function SkillCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold">Skills</h3>
          <CirclePencil />
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
