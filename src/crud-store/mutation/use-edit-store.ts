import { useMutation } from '@tanstack/react-query';
import { request } from '../../config/data/request';
import type { adminT, EditAdminPayload, inputErrT } from '../../types/types';

export const useEditStore = () => {
  return useMutation<adminT, inputErrT, EditAdminPayload>({
    mutationFn: ({ id, ...data }) =>
      request.patch(`/store/${id}`, data).then((res) => res.data.data),
  });
};
