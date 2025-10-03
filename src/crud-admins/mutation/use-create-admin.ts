import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../config/data/request';
import type { adminT } from '../../types/types';

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAdmin: Omit<adminT, 'id'>) =>
      request.post('/admin', newAdmin).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
};
