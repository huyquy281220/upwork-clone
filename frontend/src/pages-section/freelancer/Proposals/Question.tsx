"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClientQuestionsSectionProps {
  questions: string[];
  clientQuestions: string[];
  setClientQuestions: (questions: string[]) => void;
}

export function ClientQuestionsSection({
  questions,
  clientQuestions,
  setClientQuestions,
}: ClientQuestionsSectionProps) {
  if (questions.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Questions</CardTitle>
        <p className="text-sm text-gray-600">
          Answer the client&#39;s questions to stand out.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question, index) => (
          <div key={index}>
            <label className="text-sm font-medium">{question}</label>
            <textarea
              placeholder="Your answer..."
              value={clientQuestions[index]}
              onChange={(e) => {
                const newAnswers = [...clientQuestions];
                newAnswers[index] = e.target.value;
                setClientQuestions(newAnswers);
              }}
              className="mt-1 min-h-[80px]"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
