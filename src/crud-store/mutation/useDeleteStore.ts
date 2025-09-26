import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../config/data/request';

const UseDeleteStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/store/${id}`).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store'] });
    },
  });
};

export default UseDeleteStore;
