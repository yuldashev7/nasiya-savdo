import { toast } from 'react-toastify';
import { usePostPassword } from './mutation/admin/use-post-password-admin';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useVerifyOtpAdmin } from './mutation/admin/use-verify-otp-admin';
import { useResetPasswordAdmin } from './mutation/admin/use-reset-password-admin';

const AdminType = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<'EMAIL' | 'OTP' | 'RESET'>('EMAIL');
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const { mutate: sendEmail } = usePostPassword();
  const { mutate: verifyOtp } = useVerifyOtpAdmin();
  const { mutate: resetPassword } = useResetPasswordAdmin();

  const handleEmail = (values: { email: string }) => {
    console.log('valuesss', values);

    setLoading(true);
    sendEmail(values, {
      onSuccess: (data: any) => {
        if (data?.otp) {
          alert(`Emailga kelgan kod: ${data?.otp}`);
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
        toast.error('xatolik yuz berdi');
        setLoading(false);
      },
    });
  };

  return (
    <div>
      {step === 'EMAIL' && (
        <Form layout="vertical" onFinish={handleEmail}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email kiriting!' },
              { type: 'email', message: 'Email noto‘g‘ri formatda!' },
            ]}
          >
            <Input placeholder="Email kiriting" />
          </Form.Item>

          <div className="text-right">
            <Button loading={loading} type="primary" htmlType="submit">
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
            label="Yangi parol"
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
          <Button htmlType="submit" loading={loading} type="primary">
            Yangilash
          </Button>
        </Form>
      )}
    </div>
  );
};
export default AdminType;
