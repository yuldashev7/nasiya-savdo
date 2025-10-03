import { useQuery } from '@tanstack/react-query';
import { request } from '../../config/data/request';
import type { adminT } from '../../types/types';

export const useGetAdmin = () => {
  return useQuery<adminT>({
    queryKey: ['admin'],
    queryFn: () =>
      request.get('/admin').then((res) =>
        res.data.data.map((item: adminT) => ({
          id: item.id,
          username: item.username,
          email: item.email,
        }))
      ),
  });
};
