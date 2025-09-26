import { request } from '../../config/data/request';
import { useQuery } from '@tanstack/react-query';
import type { adminT } from '../../types/types';

export const useGetStoreById = (id: string) => {
  return useQuery<adminT>({
    queryKey: ['store', id],
    queryFn: () => request.get(`/store/${id}`).then((res) => res.data.data),
    enabled: !!id,
  });
};
