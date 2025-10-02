import { useMutation } from '@tanstack/react-query';
import { request } from '../../config/data/request';
import type { debtorT, EditAdminPayload, inputErrT } from '../../types/types';

export const useEditDebtor = () => {
  return useMutation<debtorT, inputErrT, EditAdminPayload>({
    mutationFn: ({ id, ...data }) =>
      request.patch(`/debtor/${id}`, data).then((res) => res.data.data),
  });
};
