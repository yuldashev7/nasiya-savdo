import { toast } from 'react-toastify';
import { usePostPassword } from './mutation/admin/use-post-password-admin';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useVerifyOtpAdmin } from './mutation/admin/use-verify-otp-admin';

const AdminType = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL');
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const { mutate: sendEmail } = usePostPassword();
  const { mutate: verifyOtp } = useVerifyOtpAdmin();

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
          toast.success('Parol tiklandi');
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
        <Form layout="vertical" onFinish={handleEmail}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email kiriting!' }]}
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
    </div>
  );
};
export default AdminType;
