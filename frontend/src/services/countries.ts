import axios from "axios";

export const getCountries = async () => {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  return response.data;
};
