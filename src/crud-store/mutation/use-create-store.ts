import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../config/data/request';
// import type { adminT } from '../../types/types';

export interface CreateStorePayload {
  fullName: string;
  address: string;
  // product: string;
  // date: string;
  // period: number;
  // sum: number;
  description?: string;
  // monthlySum: number;
  // remnant?: number;
  phoneNumber: string;
  storeId?: string | null;
  imageDebtor?: string;
  role?: string;
  wallet?: number;
}

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newStore: CreateStorePayload) =>
      request.post('/store', newStore).then((res) => res.data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['new-store'] }),
  });
};
