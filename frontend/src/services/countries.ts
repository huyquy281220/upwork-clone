import axios from "axios";

export const getCountries = async () => {
  const response = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name"
  );
  return response.data;
};

export const getLanguages = async () => {
  const response = await axios.get(
    `https://restcountries.com/v3.1/all?fields=languages`
  );
  return response.data;
};
