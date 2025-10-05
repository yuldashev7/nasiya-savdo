import { useMutation } from '@tanstack/react-query';
import { request } from '../../../../config/data/request';

export const useResetPasswordAdmin = () => {
  return useMutation({
    mutationFn: (payload: { email: string; newPassword: string }) =>
      request
        .patch('/admin/reset-password', payload)
        .then((res) => res.data.data),
  });
};
