import smwApiClient from '../../api/smwClient';
import { AuthResponse, LoginData, RegisterData } from '../interfaces';

export const apiLogin = async (loginData: LoginData): Promise<AuthResponse> => {
  const response = await smwApiClient.post<AuthResponse>('/auth/login', loginData);
  return response.data;
};

export const apiRegister = async (registerData: RegisterData): Promise<AuthResponse> => {
  const response = await smwApiClient.post<AuthResponse>('/auth/register', registerData);
  return response.data;
}

export const apiRenewToken = async () => {
    const response = await smwApiClient.get<AuthResponse>('/auth/token');
    return response.data;
}