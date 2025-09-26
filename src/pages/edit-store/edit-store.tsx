import { useNavigate, useParams } from 'react-router-dom';
import { useEditStore } from '../../crud-store/mutation/useEditStore';
import { useGetStoreById } from '../../crud-store/query/useGetStoreById';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import type { adminT, inputErrT } from '../../types/types';
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'antd';
import { useAuth } from '../../hooks/useAuth/useAuth';

const EditStore = () => {
  const { id } = useParams<{ id: string }>();
  const { data: store } = useGetStoreById(id!);
  const { mutate } = useEditStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = useForm();
  const { user } = useAuth();

  useEffect(() => {
    if (store) {
      form.setFieldsValue({
        fullName: store.fullName,
        email: store.email,
        phoneNumber: store.phoneNumber,
      });
    }
  }, [store, form]);

  const handleError = (error: Record<string, string>) => {
    const fields = Object.keys(error).map((key) => ({
      name: key,
      error: [error[key]],
    }));
    form.setFields(fields);
  };

  const onFinish = (values: adminT) => {
    setLoading(true);
    const payload = {
      id: id!,
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };
    mutate(payload, {
      onSuccess: () => {
        toast.success('Store Yangilandi');
        navigate(
          user?.role === 'SUPER ADMIN' ? '/super-admin/admin' : '/admin'
        );
        setLoading(false);
      },
      onError: (err: inputErrT) => {
        handleError(err.data?.errors || {});
        setLoading(false);
        // toast.error('Store Yangilashda Xatolik');
      },
    });
  };
  return (
    <>
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
            { required: true, message: 'Ism Kiriting' },
            { min: 4, message: 'Login kamida 4 ta belgi bo‘lishi kerak' },
          ]}
        >
          <Input placeholder="Ism Kiriting" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email Kiriting' },
            {
              type: 'email',
              message: "To'g'ri email kiriting",
            },
          ]}
        >
          <Input placeholder="Email Kiriting" />
        </Form.Item>

        <Form.Item
          label="telefon Raqam"
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
          <Input placeholder="Telefon Raqam Kiriting" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Yangilash
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default EditStore;
