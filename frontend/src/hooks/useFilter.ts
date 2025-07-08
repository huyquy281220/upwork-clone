"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function useFilter<T extends Record<string, string>>(
  defaultValues: T
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getFilter = (key: keyof T): string => {
    return searchParams.get(key as string) || defaultValues[key];
  };

  const setFilter = (key: keyof T, value: string) => {
    const current = searchParams.get(key as string) || defaultValues[key];
    if (current === value) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set(key as string, value);
    router.replace(`?${params.toString()}`);
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    Object.keys(defaultValues).forEach((key) => {
      params.set(key, defaultValues[key]);
    });
    router.replace(`?${params.toString()}`);
  };

  return { getFilter, setFilter, resetFilters };
}
