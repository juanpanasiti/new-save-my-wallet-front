// Generated by https://quicktype.io

export interface AuthResponse {
	id: string;
	username: string;
	profile: Profile;
	token: string;
}

export interface Profile {
	id: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	creditCardAmountAlert: number;
	user: string;
}
