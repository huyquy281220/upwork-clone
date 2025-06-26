"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <p className="text-sm text-gray-600">
          Introduce yourself and explain why you&#39;re the best fit for this
          job.
        </p>
      </CardHeader>
      <CardContent>
        <textarea
          placeholder="Dear [Client Name],

            I'm excited about your project and believe I'm the perfect fit because...

            Here's how I can help:
            • [Specific skill/experience relevant to the project]
            • [Another relevant point]
            • [Timeline or availability]

            I'd love to discuss your project further. When would be a good time for a quick call?

            Best regards,
            [Your Name]"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="min-h-[300px] w-full p-2 rounded-sm resize-none bg-transparent border border-gray-400"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">
            {coverLetter.length}/5000 characters
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
