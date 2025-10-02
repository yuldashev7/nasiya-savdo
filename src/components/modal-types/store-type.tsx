import { toast } from 'react-toastify';
import { usePostPasswordStore } from './mutation/usePostPasswordStore';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';

const StoreType = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = usePostPasswordStore();

  const onFinish = (values: { email: string }) => {
    setLoading(true);
    mutate(
      {
        email: values.email,
      },
      {
        onSuccess: () => {
          toast.success("Do'kon paroli yuborildi!");
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
      <Form onFinish={onFinish} layout="vertical">
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
    </div>
  );
};
export default StoreType;
