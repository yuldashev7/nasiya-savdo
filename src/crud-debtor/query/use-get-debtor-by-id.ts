import { useQuery } from '@tanstack/react-query';
import type { debtorT } from '../../types/types';
import { request } from '../../config/data/request';

export const useGetDebtorById = (id: string) => {
  return useQuery<debtorT>({
    queryKey: ['debtor', id],
    queryFn: () => request.get(`/debtor/${id}`).then((res) => res.data.data),
    enabled: !!id,
  });
};
