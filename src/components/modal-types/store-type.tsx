import { toast } from 'react-toastify';
import { usePostPasswordStore } from './mutation/store/use-post-password-store';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useVerifyOtpStore } from './mutation/store/use-verify-otp-store';

const StoreType = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL');
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: sendEmail } = usePostPasswordStore();
  const { mutate: verifyOtp } = useVerifyOtpStore();

  const handleEmail = (values: { email: string }) => {
    setLoading(true);
    sendEmail(values, {
      onSuccess: (data: any) => {
        toast.success('Emailingizga kod yuborildi!');
        setTransactionId(data.transactionId);
        setStep('OTP');
        setLoading(false);
      },
      onError: () => {
        toast.error('Xatolik yuz berdi');
        setLoading(false);
      },
    });
  };

  const handleVerifyOtp = (values: { otp: string }) => {
    if (!transactionId) return;
    setLoading(true);
    verifyOtp(
      { otp: values.otp, transactionId },
      {
        onSuccess: () => {
          toast.success('Kod yuborildi');
          onClose();
          setLoading(false);
        },
        onError: () => {
          toast.error('Xatolik yuz berdi');
          setLoading(false);
        },
      }
    );
  };

  return (
    <div>
      {step === 'EMAIL' && (
        <Form onFinish={handleEmail} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email kiriting!' }]}
          >
            <Input placeholder="Email kiriting" />
          </Form.Item>

          <div className="flex-col text-right">
            <Button type="primary" htmlType="submit" loading={loading}>
              Yuborish
            </Button>
          </div>
        </Form>
      )}

      {step === 'OTP' && (
        <Form layout="vertical" onFinish={handleVerifyOtp}>
          <Form.Item
            label="Verify code"
            name="otp"
            rules={[{ required: true, message: 'Kodni kiriting!' }]}
          >
            <Input placeholder="Emailga yuborilgan kodni kiriting" />
          </Form.Item>

          <div className="text-right">
            <Button loading={loading} type="primary" htmlType="submit">
              Yuborish
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};
export default StoreType;
