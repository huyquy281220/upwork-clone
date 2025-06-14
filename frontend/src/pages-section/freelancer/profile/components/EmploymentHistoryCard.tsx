import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const employmentHistory = [
  {
    title: "Software Engineer | test",
    period: "January 2023 - Present",
    company: "test",
  },
];

export function EmploymentHistoryCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Employment history</h3>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {employmentHistory.map((job, index) => (
          <div key={index} className="flex justify-between">
            <div>
              <h4 className="font-medium">{job.title}</h4>
              <p className="text-sm text-muted-foreground">{job.period}</p>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div className="flex gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
