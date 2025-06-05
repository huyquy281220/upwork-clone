import { getCountries } from "@/services/countries";

export const getLanguages = async () => {
  const countries = await getCountries();

  const languageSet = new Set<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  countries.forEach((country: any) => {
    const langs = Object.values(country.languages || {});
    langs.forEach((lang) => languageSet.add(lang as string));
  });

  return Array.from(languageSet);
};
