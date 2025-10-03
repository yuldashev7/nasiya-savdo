import { useQuery } from '@tanstack/react-query';
import { request } from '../../config/data/request';

export const useGetDebtorPagination = () => {
  return useQuery({
    queryKey: ['pagination-debtor'],
    queryFn: () =>
      request.get('/debtor/pagination').then((res) => res.data.data),
  });
};
