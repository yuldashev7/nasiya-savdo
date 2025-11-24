import type { adminT } from '../../types/types';
import { useQuery } from '@tanstack/react-query';
import { request } from '../../config/data/request';

export const useGetStoreById = (id: string) => {
  return useQuery<adminT>({
    queryKey: ['store', id],
    queryFn: () => request.get(`/store/${id}`).then((res) => res.data.data),
    enabled: !!id,
  });
};
