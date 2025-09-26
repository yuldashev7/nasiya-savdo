import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../config/data/request';
// import type { adminT } from '../../types/types';

export interface CreateStorePayload {
  fullName?: string;
  email: string;
  phoneNumber?: string;
  role: string;
  password?: string;
  wallet: number;
}

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newStore: CreateStorePayload) =>
      request.post('/store', newStore).then((res) => res.data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['new-store'] }),
  });
};
