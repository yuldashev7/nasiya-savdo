import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { request } from '../../../../config/data/request';
import type { PasswordT } from '../../../../types/types';

export const usePostPasswordStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PasswordT) =>
      request
        .post('/store/forgot-password', payload)
        .then((res) => res.data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['store'] }),
  });
};
