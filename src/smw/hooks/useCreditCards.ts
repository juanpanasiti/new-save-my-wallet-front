import { useQuery } from '@tanstack/react-query';
import { CreditCard } from '../interfaces';
import { apiCreditCardList } from '../api';
import { useAuth } from '../../auth/hooks';
import { useEffect, useState } from 'react';

const CREDIT_CARDS_QUERY_KEY = 'creditCards';
export const useCreditCards = () => {
	const [mainCreditCards, setMainCreditCards] = useState<CreditCard[]>([]);
	const { authQuery } = useAuth();
	const creditCardsQuery = useQuery<CreditCard[]>({
		queryKey: [CREDIT_CARDS_QUERY_KEY],
		queryFn: async () => await apiCreditCardList(), // TODO: implement pagination
		staleTime: Infinity,
		placeholderData: [],
		enabled: authQuery.data?.isAuthenticated,
	});

	useEffect(() => {
		if (creditCardsQuery.data) setMainCreditCards(creditCardsQuery.data?.filter((cc) => !cc.mainCreditCard));
	}, [creditCardsQuery.data]);

	return {
		creditCardsQuery,
        mainCreditCards
	};
};
