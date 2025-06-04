"use client";

import { Country } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/services/countries";

export const useCountries = () => {
  const { data: countries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  return countries;
};
