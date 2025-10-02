import { useNavigate, useParams } from 'react-router-dom';
import { useEditStore } from '../../../crud-store/mutation/useEditStore';
import { useGetStoreById } from '../../../crud-store/query/useGetStoreById';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import type { adminT, inputErrT } from '../../../types/types';
import { toast } from 'react-toastify';
import { Button, Form, Input, InputNumber } from 'antd';
import { useAuth } from '../../../hooks/useAuth/useAuth';

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
        wallet: store.wallet,
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
      wallet: Number(values.wallet),
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
          label="Balans"
          name="wallet"
          rules={[{ required: true, message: 'wallet' }]}
        >
          <InputNumber
            placeholder="Balans (UZS)"
            addonAfter="UZS"
            min={0}
            formatter={(value) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : ''
            }
            parser={(value: any) =>
              value?.replace(/\s?UZS/g, '').replace(/\s/g, '') || ''
            }
          />
        </Form.Item>

        <Form.Item
          label="Telefon Raqam"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Telefon raqam kiritilishi shart' },
            {
              pattern: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
              message: 'Telefon raqam noto‘g‘ri formatda',
            },
          ]}
        >
          <Input
            maxLength={12}
            addonBefore="+998"
            placeholder="90-123-45-67"
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              let formatted = '';

              if (value.length > 0) formatted += value.slice(0, 2);
              if (value.length >= 3) formatted += '-' + value.slice(2, 5);
              if (value.length >= 6) formatted += '-' + value.slice(5, 7);
              if (value.length >= 8) formatted += '-' + value.slice(7, 9);

              form.setFieldsValue({ phoneNumber: formatted });
            }}
          />
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
