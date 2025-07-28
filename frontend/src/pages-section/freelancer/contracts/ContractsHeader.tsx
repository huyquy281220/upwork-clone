"use client";

import { Eye, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContractsHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Contracts</h1>
      <div className="space-x-2">
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/create-contract">
            <Plus className="w-4 h-4 mr-2" />
            Create Contract
          </Link>
        </Button>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/freelancer-contract">
            <Eye className="w-4 h-4 mr-2" />
            View as Freelancer
          </Link>
        </Button>
      </div>
    </div>
  );
}
