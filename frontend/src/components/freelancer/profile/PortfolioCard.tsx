import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { BagSvg } from "@/assets/svg";
import Image from "next/image";

export function PortfolioCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Portfolio</h3>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex gap-4 mt-4">
          <Button variant="outline" size="sm">
            Published
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Drafts
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Image
            src={BagSvg}
            alt="Bag"
            width={145}
            height={130}
            className="mx-auto mb-5"
          />
          <p className="text-muted-foreground mb-4">
            <Button variant="link" className="text-green-600 p-0">
              Add a project.
            </Button>{" "}
            Talent are hired 5x more often if they&#39;ve published a portfolio.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
