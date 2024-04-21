import { CreditCard } from "../interfaces";

export const filterExtensions = (extensions: CreditCard[], mainCardId: string): CreditCard[] => {
    return extensions.filter(extension => extension.mainCreditCard === mainCardId);
}