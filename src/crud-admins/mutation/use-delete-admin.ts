import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../config/data/request';

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/admin/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
};
