import { AuthType } from "../components/auth-form/AuthForm";

export const baseUrl = "http://localhost:8080";

export const auth = async (requestBody: object, type: AuthType) => {
  const path = type === AuthType.SIGN_UP ? "signup" : "login";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(`${baseUrl}/auth/${path}`, requestOptions);
  return await response.json();
};
