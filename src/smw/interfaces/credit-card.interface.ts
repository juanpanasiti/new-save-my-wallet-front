// Generated by https://quicktype.io

export interface CreditCard {
	id: string;
	mainCreditCard: string | null;
	name: string;
	limit: number;
	nextClosingDate: string;
	nextExpiringDate: string;
	owner: string;
	extensions: string[];
}