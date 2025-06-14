import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Award, CheckCircle } from "lucide-react";

export function CertificationCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Certifications</h3>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Listing your certifications can help prove your specific knowledge
            or abilities. (API) You can add them manually or import them from
            Credly.
          </p>
          <div className="space-y-2">
            <Button variant="link" className="text-green-600 block">
              Add manually
            </Button>
            <Button variant="link" className="text-green-600 block">
              Import from Credly
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
