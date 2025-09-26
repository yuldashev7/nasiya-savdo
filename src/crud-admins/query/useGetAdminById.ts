import { useQuery } from '@tanstack/react-query';
import { request } from '../../config/data/request';
import type { adminT } from '../../types/types';

export const useGetAdminById = (id: string) => {
  return useQuery<adminT>({
    queryKey: ['admin', id],
    queryFn: () => request.get(`/admin/${id}`).then((res) => res.data.data),
    enabled: !!id,
  });
};
