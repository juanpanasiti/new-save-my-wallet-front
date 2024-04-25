import moment from 'moment';

export const getNextPaymentDate = (date: string): string => {
    return moment(date).add(1,'month').set('date', 1).format('YYYY-MM-DD');
}