"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface CoverLetterSectionProps {
  coverLetter: string;
  setCoverLetter: (value: string) => void;
}

export function CoverLetterSection({
  coverLetter,
  setCoverLetter,
}: CoverLetterSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cover Letter</CardTitle>
        <p className="text-sm text-foreground opacity-80">
          Introduce yourself and explain why you&#39;re the best fit for this
          job.
        </p>
      </CardHeader>
      <CardContent>
        <Textarea
          // placeholder="Write your cover letter here..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="min-h-[300px] w-full p-2 rounded-sm resize-none bg-transparent border border-gray-400"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-foreground opacity-80">
            {coverLetter.length}/5000 characters
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
