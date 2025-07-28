"use client";

import { Search, Calendar, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContractProps, ContractType } from "@/types/contract";

interface ContractsTableProps {
  contracts: ContractProps[];
}

const titles = [
  "Contract Details",
  "Client & Freelancer",
  "Status & Type",
  "Budget & Progress",
  "Timeline",
  "Actions",
];

export function ContractsTable({ contracts }: ContractsTableProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      completed: { color: "bg-blue-100 text-blue-800", label: "Completed" },
      paused: { color: "bg-yellow-100 text-yellow-800", label: "Paused" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
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
              <tr className="border-b bg-subBackground">
                {titles.map((title) => (
                  <th
                    key={title}
                    className="px-6 py-4 text-left text-xs text-foreground font-bold uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contracts.length === 0 ? (
                <tr className="bg-subBackground">
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
                contracts.map((contract) => (
                  <tr key={contract.id} className="bg-subBackground">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {contract.title}
                        </div>
                        <div className="text-sm text-foreground opacity-80">
                          ID: #{contract.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {contract.client.user.fullName}
                        </div>
                        <div className="text-sm text-foreground opacity-80">
                          {contract.freelancer.user.fullName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {getStatusBadge(contract.status)}
                        {getTypeBadge(contract.contractType)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {formatBudget(contract)}
                        </div>
                        <div className="text-sm text-foreground opacity-80">
                          {/* {contract.progress}% complete */}
                        </div>
                        <div className="w-full bg-foreground rounded-full h-2 mt-1">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            // style={{ width: `${contract.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-foreground flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(contract.startedAt).toLocaleDateString()}
                        </div>
                        {contract.completedAt && (
                          <div className="text-sm text-foreground opacity-80">
                            Due:{" "}
                            {new Date(
                              contract.completedAt
                            ).toLocaleDateString()}
                          </div>
                        )}
                        {/* <div className="text-xs text-foreground opacity-80">
                          Last activity:{" "}
                          {new Date(contract.lastActivity).toLocaleDateString()}
                        </div> */}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Contract</DropdownMenuItem>
                          <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Cancel Contract
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
