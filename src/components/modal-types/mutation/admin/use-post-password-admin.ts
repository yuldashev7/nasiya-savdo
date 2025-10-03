import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../../../config/data/request';
import type { PasswordT } from '../../../../types/types';

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
