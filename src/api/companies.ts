import { baseUrl } from "./auth";

export const getCompanies = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${baseUrl}/companies`, requestOptions);
  return await response.json();
};
