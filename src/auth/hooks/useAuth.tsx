import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiLogin } from '../api/auth.endpoints';
import { saveToken } from '../helpers';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      saveToken(data.access_token);
      queryClient.setQueryData(['isLoggedIn'], true);
    },
  });
  return {
    loginMutation,
  };
};
