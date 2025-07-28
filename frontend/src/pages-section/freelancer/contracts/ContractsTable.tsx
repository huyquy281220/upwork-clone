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
import { ContractType } from "@/types/contract";

interface Contract {
  id: number;
  title: string;
  client: string;
  freelancer: string;
  status: string;
  type: string;
  budget: number | null;
  hourlyRate: number | null;
  startDate: string;
  endDate: string | null;
  progress: number;
  lastActivity: string;
}

interface ContractsTableProps {
  contracts: Contract[];
}

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
        {type === ContractType.FIXED_PRICE ? "Fixed Price" : "Hourly"}
      </Badge>
    );
  };

  const formatBudget = (contract: Contract) => {
    if (contract.type === ContractType.FIXED_PRICE) {
      return `$${contract.budget?.toLocaleString()}`;
    } else {
      return `$${contract.hourlyRate}/hr`;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client & Freelancer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget & Progress
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contracts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
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
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contract.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: #{contract.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contract.client}
                        </div>
                        <div className="text-sm text-gray-500">
                          {contract.freelancer}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {getStatusBadge(contract.status)}
                        {getTypeBadge(contract.type)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatBudget(contract)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {contract.progress}% complete
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${contract.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(contract.startDate).toLocaleDateString()}
                        </div>
                        {contract.endDate && (
                          <div className="text-sm text-gray-500">
                            Due:{" "}
                            {new Date(contract.endDate).toLocaleDateString()}
                          </div>
                        )}
                        <div className="text-xs text-gray-400">
                          Last activity:{" "}
                          {new Date(contract.lastActivity).toLocaleDateString()}
                        </div>
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
