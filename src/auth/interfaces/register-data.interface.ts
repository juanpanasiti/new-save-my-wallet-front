import { LoginData } from "./login-data.interface";

export interface RegisterData extends LoginData {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    creditCardAmountAlert: number
}