import { useNavigate, useParams } from 'react-router-dom';
import { useGetDebtorById } from '../../../crud-debtor/query/use-get-debtor-by-id';
import { useEditDebtor } from '../../../crud-debtor/mutation/use-edit-debtor';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { useAuth } from '../../../hooks/use-auth/use-auth';
import type { debtorT, inputErrT } from '../../../types/types';
import { toast } from 'react-toastify';
import { Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const EditDebtor = () => {
  const { id } = useParams<{ id: string }>();
  const { data: debtor } = useGetDebtorById(id!);
  const { mutate } = useEditDebtor();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = useForm();
  const { user } = useAuth();

  useEffect(() => {
    if (debtor) {
      form.setFieldsValue({
        imageDebtor: debtor.imagesDebtor,
        fullName: debtor.fullName,
        address: debtor.address,
        description: debtor.description,
        phoneNumber: debtor.phoneNumber,
      });
    }
  }, [debtor, form]);

  const handleEditnavigate = () => {
    if (user?.role === 'STORE') {
      return navigate('/store-dashboard');
    } else if (user?.role === 'ADMIN') {
      return navigate('/admin/store-dashboard');
    } else if (user?.role === 'SUPER ADMIN') {
      return navigate('/super-admin/store-dashboard');
    }
  };

  const handleError = (error: Record<string, string>) => {
    const fields = Object.keys(error).map((key) => ({
      name: key,
      errors: [error[key]],
    }));
    form.setFields(fields);
  };
  const onFinish = (values: debtorT) => {
    setLoading(true);

    const formData = new FormData();

    // formData.append('id', id!);
    formData.append('fullName', values.fullName || '');
    formData.append('address', values.address || '');
    formData.append('description', values.description || '');
    formData.append('phoneNumber', values.phoneNumber || '');
    // formData.append('storeId', storeId);

    if ((values.imageDebtor as any)?.[0]?.originFileObj) {
      formData.append(
        'imageDebtor',
        (values.imageDebtor as any)[0].originFileObj
      );
    }

    mutate(
      { id: id!, formData },
      {
        onSuccess: () => {
          toast.success('Qarzdor Yangilandi');
          handleEditnavigate();
          setLoading(false);
        },
        onError: (err: inputErrT) => {
          toast.error('Xatolik yuz berdi');
          handleError(err.data?.errors || {});
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="px-[10px]">
      <div className="mt-[20px] mb-[40px]">
        <Button onClick={handleEditnavigate}>Ortga Qaytish</Button>
      </div>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Ism"
          name="fullName"
          rules={[
            { required: true, message: 'Isim Kiriting' },
            { min: 4, message: 'Login kamida 4 ta belgi bo‘lishi kerak' },
          ]}
        >
          <Input placeholder="Ism Kiriting" />
        </Form.Item>

        <Form.Item
          label="Manzil"
          name="address"
          rules={[{ required: true, message: 'Manzil Kiriting' }]}
        >
          <Input placeholder="Manzil Kiriting" />
        </Form.Item>

        <Form.Item label="Tavsiv" name="description">
          <Input.TextArea placeholder="Qo'shimcha Ma'lumot" />
        </Form.Item>

        <Form.Item
          label="Telefon raqam"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Telefon raqam kiritilishi shart' },
            {
              pattern: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
              message: 'Telefon raqam noto‘g‘ri formatda',
            },
          ]}
          normalize={(value: string) => {
            if (!value) return value;
            let digits = value.replace(/\D/g, '');
            let formatted = '';

            if (digits.length > 0) formatted += digits.slice(0, 2);
            if (digits.length >= 3) formatted += '-' + digits.slice(2, 5);
            if (digits.length >= 6) formatted += '-' + digits.slice(5, 7);
            if (digits.length >= 8) formatted += '-' + digits.slice(7, 9);

            return formatted;
          }}
        >
          <Input maxLength={12} addonBefore="+998" placeholder="90-123-45-67" />
        </Form.Item>

        <Form.Item
          label="Rasm"
          name="imageDebtor"
          rules={[{ required: true, message: 'Rasim yuklash shart' }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            accept="image/*"
            beforeUpload={() => false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Rasm yuklash</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Yangilash
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditDebtor;
