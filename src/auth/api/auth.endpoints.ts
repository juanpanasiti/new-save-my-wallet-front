import smwApiClient from '../../api/smwClient';
import { LoginData, LoginResponse, UserInfoResponse } from '../types/auth.interfaces';

export const apiLogin = async (loginForm: LoginData): Promise<LoginResponse> => {
  const formData = new FormData();
  formData.append('username', loginForm.username);
  formData.append('password', loginForm.password);

  const response = await smwApiClient.post<LoginResponse>('/auth/login', formData);
  return response.data;
};

export const apiGetUserInfo = async () => {
    const response = await smwApiClient.get<UserInfoResponse>('/auth/info');
    return response.data;
}