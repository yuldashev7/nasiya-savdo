import { request } from '../../../../config/data/request';
import type { PasswordT } from '../../../../types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PasswordT) =>
      request
        .post('/admin/forget-password', payload)
        .then((res) => res.data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin'] }),
  });
};
