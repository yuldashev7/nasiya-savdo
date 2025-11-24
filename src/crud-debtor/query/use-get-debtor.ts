import { useQuery } from '@tanstack/react-query';
import type { debtorT } from '../../types/types';
import { request } from '../../config/data/request';

export const useGetDebtor = () => {
  return useQuery<debtorT[]>({
    queryKey: ['debtor'],
    queryFn: () =>
      request.get('/debtor').then((res) =>
        res.data.data.map(
          (item: any): debtorT => ({
            id: item.id,
            fullName: item.fullName,
            address: item.address,
            description: item.description,
            phoneNumber: item.phone,
            storeId: item.storeId,
            imagesDebtor: item.imagesDebtor,
            createdAt: item.createdAt,
          })
        )
      ),
  });
};
