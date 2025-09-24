import { Button, Input, Form, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateAdmin } from '../../crud-admins/mutation/useCreateAdmin';
import { toast } from 'react-toastify';
import { useForm } from 'antd/es/form/Form';
import type { inputErrT } from '../../types/types';
import { useState } from 'react';

const AddAdmin = () => {
  const navigate = useNavigate();
  const { mutate } = useCreateAdmin();
  const { Option } = Select;
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleError = (errors: Record<string, string>) => {
    const fields = Object.keys(errors).map((key) => ({
      name: key,
      errors: [errors[key]],
    }));
    form.setFields(fields);
  };

  const onFinish = (values: any) => {
    setLoading(true);
    const payload = {
      username: values.username,
      password: values.password,
      email: values.email,
      role: values.role,
      isActive: true,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Admin Qo'shildi");
        navigate('/super-admin');
        setLoading(false);
      },
      onError: (err: inputErrT) => {
        handleError(err.data?.errors || {});
        toast.error(
          "Parolda kamida 1 ta katta harf 2 ta raqam va ' ! ' bo'lishi kerak"
        );
        console.error('admin', err);
        setLoading(false);
      },
    });
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Username kiritilishi shart' }]}
        >
          <Input placeholder="Username kiriting" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Parol kiritish shart' }]}
        >
          <Input.Password placeholder="Parol kiriting" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email kiritilishi shart' },
            { type: 'email', message: "To'g'ri email kiriting" },
          ]}
        >
          <Input placeholder="Email kiriting" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Role tanlanishi shart' }]}
        >
          <Select placeholder="Role tanlang">
            <Option value="ADMIN">ADMIN</Option>
            <Option value="SELLER">SELLER</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Qo'shish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAdmin;
