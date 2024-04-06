import { AuthStatus } from '../../common/interfaces';
import { apiRenewToken } from '../api/auth.endpoints';

export const getNewAuthStatus = async (): Promise<AuthStatus> => {
	const authData = await apiRenewToken();
	return {
		userId: authData.id,
		username: authData.username,
		email: authData.email,
		token: authData.token,
		isAuthenticated: !!authData.token,
	};
};
