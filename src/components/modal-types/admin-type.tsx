import { toast } from 'react-toastify';
import { usePostPassword } from './mutation/usePostPassword';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';

const AdminType = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = usePostPassword();

  const onFinish = (values: { email: string }) => {
    setLoading(true);
    mutate(
      { email: values.email },
      {
        onSuccess: () => {
          toast.success('Admin paroli yuborildi!');
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
      <Form layout="vertical" onFinish={onFinish}>
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
    </div>
  );
};
export default AdminType;
