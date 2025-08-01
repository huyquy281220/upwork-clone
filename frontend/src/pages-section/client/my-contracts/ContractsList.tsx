"use client";

import { ContractProps } from "@/types/contract";
import { ContractCard } from "./components/ContractCard";

interface ContractsListProps {
  contracts: ContractProps[];
  onContractSelect: (contractId: string) => void;
}

export function ContractsList({
  contracts,
  onContractSelect,
}: ContractsListProps) {
  if (contracts.length === 0) {
    return (
      <div className="bg-background rounded-lg shadow-sm border p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No contracts found
          </h3>
          <p className="text-foreground opacity-85">
            Try adjusting your filters or create a new contract to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contracts.map((contract) => (
        <ContractCard
          key={contract.id}
          contract={contract}
          onClick={() => onContractSelect(contract.id)}
        />
      ))}
    </div>
  );
}
