import { useNavigate } from 'react-router-dom';
import {
  useCreateStore,
  type CreateStorePayload,
} from '../../crud-store/mutation/useCreateStore';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { Button, Form, Input } from 'antd';
import type { inputErrT } from '../../types/types';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useAuth } from '../../hooks/useAuth/useAuth';
const { user } = useAuth();

const AddStore = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate } = useCreateStore();
  const [form] = useForm();

  const handleError = (errors: Record<string, string>) => {
    const fields = Object.keys(errors).map((key) => ({
      name: key,
      errors: [errors[key]],
    }));
    form.setFields(fields);
  };

  const onFinish = (values: CreateStorePayload) => {
    setLoading(true);
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      role: 'STORE',
      password: values.password,
      wallet: 0,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Yangi Store Qo'shildi");
        if (user?.role === 'SUPER ADMIN') {
          navigate('/super-admin/admin');
          //  navigate(
          //   user?.role === 'SUPER ADMIN' ? '/super-admin/admin' : '/admin'
          // );
        } else {
          navigate('/admin');
        }
        setLoading(false);
      },
      onError: (err: inputErrT) => {
        toast.error("Yangi Store Qo'shishda Xatolik");
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
          setLoading(false);
        }
      },
    });
  };
  return (
    <div>
      <div className="mt-[10px] mb-[20px]">
        <Button
          className="w-[100px]"
          onClick={() =>
            navigate(
              user?.role === 'SUPER ADMIN' ? '/super-admin/admin' : '/admin'
            )
          }
        >
          Ortga qaytish
        </Button>
      </div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Ism"
          name="fullName"
          rules={[
            { required: true, message: 'Ism kiritilishi shart' },
            { min: 4, message: 'Login kamida 4 ta belgi bo‘lishi kerak' },
          ]}
        >
          <Input placeholder="Ismingizni Kiriting" />
        </Form.Item>

        <Form.Item
          label="Parol"
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
          <Input.Password placeholder="Parol Kiriting" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email kiritilishi shart' },
            { type: 'email', message: "To'g'ri email kiriting" },
          ]}
        >
          <Input placeholder="Email Kiriting" />
        </Form.Item>

        <Form.Item
          label="Telfon Raqam"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Telefon raqam kiritilishi shart' },
            {
              pattern:
                /^(?:\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{2}\s?\d{2})$/,
              message: 'Telefon raqam noto‘g‘ri formatda.',
            },
          ]}
        >
          <Input placeholder="+998" />
        </Form.Item>

        <Form.Item name="role" initialValue="STORE" hidden>
          <Input type="hidden" />
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
export default AddStore;
