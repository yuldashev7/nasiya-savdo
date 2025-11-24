import { request } from '../../config/data/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateDebtor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return request
        .post('/debtor', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => res.data.data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['debtor'] }),
  });
};
