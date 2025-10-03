import { request } from '../../config/data/request';
import { useMutation } from '@tanstack/react-query';
import type { adminT, EditAdminPayload, inputErrT } from '../../types/types';

export const useEditAdmin = () => {
  return useMutation<adminT, inputErrT, EditAdminPayload>({
    mutationFn: ({ id, ...data }) =>
      request.patch(`/admin/update/${id}`, data).then((res) => res.data.data),
  });
};
