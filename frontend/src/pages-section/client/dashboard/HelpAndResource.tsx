import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { RocketSvg } from "@/assets/svg";
import Image from "next/image";

export function HelpResourcesSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-foreground">
          Help and resources
        </h2>
        <Button variant="ghost" className="text-green-600 hover:text-green-700">
          View all resources
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-4">
              <Badge variant="secondary" className="text-xs font-medium w-fit">
                Get started
              </Badge>

              <h3 className="text-2xl font-medium text-foreground leading-tight max-w-md">
                Get started and connect with talent to get work done
              </h3>

              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white mt-6"
              >
                Learn more
              </Button>
            </div>

            <div className="flex-shrink-0 ml-8">
              <Image src={RocketSvg} alt="Rocket" width={100} height={100} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
