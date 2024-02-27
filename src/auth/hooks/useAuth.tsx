import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "../api/auth.endpoints";

export const useAuth = () => {
    const authMutation = useMutation({
        mutationFn: apiLogin,
        onSuccess: (data) => localStorage.setItem("token", data.access_token),
    })
  return {
    authMutation
  };
};
