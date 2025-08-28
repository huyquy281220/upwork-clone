"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimelineSectionProps {
  timeline: string;
  setTimeline: (value: string) => void;
}

export function TimelineSection({
  timeline,
  setTimeline,
}: TimelineSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline & Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="timeline">How long will this project take?</label>
          <Select value={timeline} onValueChange={setTimeline}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less-than-1-week">Less than 1 week</SelectItem>
              <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
              <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
              <SelectItem value="1-2 months">1-2 months</SelectItem>
              <SelectItem value="2-3 months">2-3 months</SelectItem>
              <SelectItem value="3-6 months">3-6 months</SelectItem>
              <SelectItem value="more than 6 months">
                More than 6 months
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
