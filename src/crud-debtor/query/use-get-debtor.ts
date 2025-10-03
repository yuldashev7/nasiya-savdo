import { useQuery } from '@tanstack/react-query';
import { request } from '../../config/data/request';
import type { debtorT } from '../../types/types';

export const useGetDebtor = () => {
  return useQuery<debtorT[]>({
    queryKey: ['debtor'],
    queryFn: () =>
      request.get('/debtor').then((res) =>
        res.data.data.map((item: debtorT) => ({
          id: item.id,
          fullName: item.fullName,
          address: item.address,
          description: item.description,
          phoneNumber: item.phoneNumber,
          storeId: item.storeId,
          imageDebtor: item.imageDebtor,
          createdAt: item.createdAt,
          // product: item.product,
          // date: item.date,
          // period: item.period,
          // sum: item.sum,
          // monthlySum: item.monthlySum,
          // remnant: item.remnant,
          //   imageDebt: item.imageDebt,
        }))
      ),
  });
};
