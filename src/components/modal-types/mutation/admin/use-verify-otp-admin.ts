import { useMutation } from '@tanstack/react-query';
import { request } from '../../../../config/data/request';

export const useVerifyOtpAdmin = () => {
  return useMutation({
    mutationFn: (payload: { transactionId: string; otp: string }) =>
      request.post('/admin/verify-otp', payload).then((res) => res.data.data),
  });
};
