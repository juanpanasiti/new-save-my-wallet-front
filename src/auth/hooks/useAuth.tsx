import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiLogin } from '../api/auth.endpoints';
import { getNewAuthStatus, saveToken } from '../helpers';
import { AuthStatus } from '../../common/interfaces';

export const useAuth = () => {
	const initialAuthStatus: AuthStatus = {
		userId: '',
		username: '',
		email: '',
		token: '',
		isAuthenticated: false,
	};
	const authQuery = useQuery<AuthStatus>({
		queryKey: ['authStatus'],
		queryFn: getNewAuthStatus,
		staleTime: 1000 * 60 * 60 * 12,
		placeholderData: initialAuthStatus,
    retryOnMount: true,
    retry: false,
	});

	const queryClient = useQueryClient();
	const loginMutation = useMutation({
		mutationFn: apiLogin,
		onSuccess: (data) => {
			saveToken(data.token);
			const authStatus: AuthStatus = {
				userId: data.id,
				username: data.username,
				email: data.email,
				token: data.token,
				isAuthenticated: true,
			};
			queryClient.setQueryData(['authStatus'], authStatus);
		},
	});

	const setLogout = () => {
		queryClient.setQueryData(['authStatus'], initialAuthStatus);
	};

	return {
		loginMutation,
		authQuery,
		setLogout,
	};
};
