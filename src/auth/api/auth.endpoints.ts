import { smwApiClient } from '../../api';
import { LoginData, LoginResponse } from '../types/auth.interfaces';

export const apiLogin = async (loginForm: LoginData): Promise<LoginResponse> => {
  const formData = new FormData();
  formData.append('username', loginForm.username);
  formData.append('password', loginForm.password);

  const response = await smwApiClient.post<LoginResponse>('/auth/login', formData);
  return response.data;
};
