import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../config/data/request';

export const useEditDebtor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      return request
        .patch(`/debtor/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => res.data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debtor'] });
    },
  });
};
