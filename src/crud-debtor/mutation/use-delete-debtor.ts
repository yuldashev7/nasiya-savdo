import { request } from '../../config/data/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteDebtor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/debtor/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['debtor'] }),
  });
};
