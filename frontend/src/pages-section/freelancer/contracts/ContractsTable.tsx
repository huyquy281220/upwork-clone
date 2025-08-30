"use client";

import {
  Search,
  Calendar,
  Eye,
  MoreHorizontal,
  BriefcaseBusiness,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContractProps, ContractStatus, ContractType } from "@/types/contract";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ContractWithProgress = ContractProps & {
  progress: number;
};

type ContractsTableProps = {
  contracts: ContractWithProgress[];
};

const titles = [
  "Contract Details",
  "Client",
  "Status & Type",
  "Budget & Progress",
  "Timeline",
  "Actions",
];

export function ContractsTable({ contracts }: ContractsTableProps) {
  const router = useRouter();

  console.log(contracts);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      [ContractStatus.PENDING]: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Pending",
      },
      [ContractStatus.ACTIVE]: {
        color: "bg-green-100 text-green-800",
        label: "Active",
      },
      [ContractStatus.COMPLETED]: {
        color: "bg-blue-100 text-blue-800",
        label: "Completed",
      },
      [ContractStatus.CANCELLED]: {
        color: "bg-red-100 text-red-800",
        label: "Cancelled",
      },
    };
    const config =
      statusConfig[status as ContractStatus] ||
      statusConfig[ContractStatus.ACTIVE];
    return <Badge className={`${config.color} text-xs`}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant="outline" className="text-xs">
        {type === ContractType.FIXED_PRICE ? "Fixed" : "Hourly"}
      </Badge>
    );
  };

  const formatBudget = (contract: ContractProps) => {
    if (contract.contractType === ContractType.FIXED_PRICE) {
      return `$${contract.totalPrice?.toLocaleString()}`;
    } else {
      return `$${contract.hourlyRate}/hr`;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full over">
            <thead className="rounded-t-lg">
              <tr className="border-b bg-card">
                {titles.map((title, index) => (
                  <th
                    key={title}
                    className={cn(
                      "px-6 py-4 text-left text-xs text-foreground font-bold uppercase tracking-wider",
                      index === 0 && "rounded-tl-lg",
                      index === titles.length - 1 && "rounded-tr-lg"
                    )}
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contracts.length === 0 ? (
                <tr className="bg-card">
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-foreground">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">No contracts found</p>
                      <p className="text-sm">
                        Try adjusting your filters or search terms
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                contracts.map((contract, index) => (
                  <tr key={contract.id} className="bg-card">
                    <td
                      className={cn(
                        "px-6 py-4",
                        index === contracts.length - 1 && "rounded-bl-lg"
                      )}
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {contract.title}
                        </p>
                        <p className="text-sm text-foreground opacity-80 line-clamp-1">
                          {contract.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-foreground">
                        {contract.client.user.fullName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {getStatusBadge(contract.status)}
                        {getTypeBadge(contract.contractType)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {formatBudget(contract)}
                        </p>
                        <p className="text-sm text-foreground opacity-80">
                          {Number(contract.progress)
                            .toFixed(2)
                            .replace(/\.?0+$/, "")}
                          % complete
                        </p>
                        <div className="w-full bg-foreground rounded-full h-2 mt-1">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${contract.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-foreground flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(contract.startedAt).toLocaleDateString()}
                        </p>
                        {contract.completedAt && (
                          <p className="text-sm text-foreground opacity-80">
                            Due:{" "}
                            {new Date(
                              contract.completedAt
                            ).toLocaleDateString()}
                          </p>
                        )}
                        {/* <div className="text-xs text-foreground opacity-80">
                          Last activity:{" "}
                          {new Date(contract.lastActivity).toLocaleDateString()}
                        </div> */}
                      </div>
                    </td>
                    <td
                      className={cn(
                        "px-6 py-4 text-right",
                        index === contracts.length - 1 && "rounded-br-lg"
                      )}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          className="flex justify-center"
                        >
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/freelancer/contract/${contract.id}`)
                            }
                            className="cursor-pointer"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/freelancer/contract/${contract.id}/work-log`
                              )
                            }
                            className="cursor-pointer"
                            disabled={contract.status !== ContractStatus.ACTIVE}
                          >
                            <BriefcaseBusiness className="w-4 h-4 mr-2" />
                            Start Work
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
