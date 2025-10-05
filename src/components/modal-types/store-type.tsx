import { toast } from 'react-toastify';
import { usePostPasswordStore } from './mutation/store/use-post-password-store';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useVerifyOtpStore } from './mutation/store/use-verify-otp-store';
import { useResetPasswordStore } from './mutation/store/use-reset-password-store';

const StoreType = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<'EMAIL' | 'OTP' | 'RESET'>('EMAIL');
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: sendEmail } = usePostPasswordStore();
  const { mutate: verifyOtp } = useVerifyOtpStore();
  const { mutate: resetPassword } = useResetPasswordStore();

  const handleEmail = (values: { email: string }) => {
    setLoading(true);
    sendEmail(values, {
      onSuccess: (data: any) => {
        if (data?.otp) {
          alert(`Emailga kelgan kod ${data?.otp}`);
        }
        setSavedEmail(values.email);
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
    if (!savedEmail) return;
    setLoading(true);
    verifyOtp(
      { email: savedEmail, otp: values.otp },
      {
        onSuccess: () => {
          setStep('RESET');
          setLoading(false);
        },
        onError: () => {
          toast.error('Xatolik yuz berdi');
          setLoading(false);
        },
      }
    );
  };

  const handleResetPassword = (values: { newPassword: string }) => {
    if (!savedEmail) return;

    const payload = { email: savedEmail, newPassword: values.newPassword };
    setLoading(true);
    resetPassword(payload, {
      onSuccess: () => {
        toast.success('Parol yangilandi');
        onClose();
        setLoading(false);
      },
      onError: () => {
        toast.error('Xatolik yuz berdi');
        setLoading(false);
      },
    });
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

      {step === 'RESET' && (
        <Form layout="vertical" onFinish={handleResetPassword}>
          <Form.Item
            label="Parol"
            name="newPassword"
            rules={[
              { required: true, message: "Parol qo'yish shart" },
              {
                min: 4,
                message: 'Parol kamida 4 ta belgidan iborat bolishi kerak',
              },
            ]}
          >
            <Input.Password placeholder="Yangi parol kiriting" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Yangilash
          </Button>
        </Form>
      )}
    </div>
  );
};
export default StoreType;
