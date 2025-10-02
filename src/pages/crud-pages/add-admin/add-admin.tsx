import { Button, Input, Form, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateAdmin } from '../../../crud-admins/mutation/useCreateAdmin';
import { toast } from 'react-toastify';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { AxiosError } from 'axios';
import type { adminT, inputErrT } from '../../../types/types';

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

  const onFinish = (values: adminT) => {
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
        toast.success("Admin qo'shildi");
        navigate('/super-admin');
        setLoading(false);
      },
      onError: (err: inputErrT) => {
        toast.error("Admin qo'shishda xatolik");
        if (err instanceof AxiosError) {
          const status = err.response?.status;
          const resData = err.response?.data;

          if (status === 409) {
            toast.error('Bunday foydalanuvchi allaqachon mavjud!');
          } else if (status === 422) {
            toast.error("Ma'lumotlarni to‘g‘ri kiriting!");
          }

          if (resData?.data?.errors) {
            handleError(resData.data.errors);
          }
        }

        setLoading(false);
      },
    });
  };

  return (
    <div>
      <div className="mt-[10px] mb-[20px]">
        <Button className="w-[100px]" onClick={() => navigate('/super-admin')}>
          Ortga qaytish
        </Button>
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Username kiritilishi shart' },
            { min: 4, message: 'Login kamida 4 ta belgi bo‘lishi kerak' },
          ]}
        >
          <Input placeholder="Username kiriting" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Parol kiritish shart' },
            {
              min: 6,
              message:
                'Parol kamida 6 ta belgi 1 ta raqam va " ! " bo‘lishi kerak',
            },
          ]}
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
