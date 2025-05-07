"use client";

import { Country } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCountries = () => {
  const { data: countries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");

      return data;
    },
  });

  return countries;
};
