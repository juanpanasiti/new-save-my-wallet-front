import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiLogin, apiRegister } from '../api/auth.endpoints';
import { getNewAuthStatus, saveToken } from '../helpers';
import { AuthStatus } from '../../common/interfaces';
import { AuthResponse } from '../interfaces';

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
	const handleAuth = (data: AuthResponse) => {
		saveToken(data.token);
		const authStatus: AuthStatus = {
			userId: data.id,
			username: data.username,
			email: data.email,
			token: data.token,
			isAuthenticated: true,
		};
		queryClient.setQueryData(['authStatus'], authStatus);
	};
	const loginMutation = useMutation({
		mutationFn: apiLogin,
		onSuccess: handleAuth,
	});
	const registerMutation = useMutation({
		mutationFn: apiRegister,
		onSuccess: handleAuth,
	});

	const setLogout = () => {
		queryClient.setQueryData(['authStatus'], initialAuthStatus);
	};

	return {
		loginMutation,
		registerMutation,
		authQuery,
		setLogout,
	};
};
