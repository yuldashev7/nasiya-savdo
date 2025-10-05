import { useMutation } from '@tanstack/react-query';
import { request } from '../../../../config/data/request';

export const useResetPasswordStore = () => {
  return useMutation({
    mutationFn: (payload: { email: string; newPassword: string }) =>
      request
        .patch('/store/reset-password', payload)
        .then((res) => res.data.data),
  });
};
