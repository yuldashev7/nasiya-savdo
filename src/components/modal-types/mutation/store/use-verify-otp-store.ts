import { useMutation } from '@tanstack/react-query';
import { request } from '../../../../config/data/request';

export const useVerifyOtpStore = () => {
  return useMutation({
    mutationFn: (payload: { transactionId: string; otp: string }) =>
      request.post('/store/verify-otp', payload).then((res) => res.data.data),
  });
};
