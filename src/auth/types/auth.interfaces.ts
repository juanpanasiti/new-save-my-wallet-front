export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData extends LoginData {
  email: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface UserInfoResponse {
    id: number;
    username: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
}