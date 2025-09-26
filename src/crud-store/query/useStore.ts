import { useQuery } from '@tanstack/react-query';
import { request } from '../../config/data/request';
import type { adminT, dataT } from '../../types/types';

export const useGetStore = () => {
  return useQuery<adminT[]>({
    queryKey: ['store'],
    queryFn: () =>
      request.get('/store').then((res) =>
        res.data.data.map((item: dataT) => ({
          id: item.id,
          fullName: item.fullName,
          phoneNumber: item.phoneNumber,
          email: item.email,
          role: item.role,
          wallet: item.wallet,
          createdAd: item.createdAt,
          updatedAt: item.updatedAt,
        }))
      ),
  });
};
