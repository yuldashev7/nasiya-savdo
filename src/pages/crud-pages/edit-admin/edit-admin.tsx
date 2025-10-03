import { useNavigate, useParams } from 'react-router-dom';
import { useEditAdmin } from '../../../crud-admins/mutation/use-edit-admin';
import { useEffect, useState } from 'react';
import type { inputErrT } from '../../../types/types';
import { Button, Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { useGetAdminById } from '../../../crud-admins/query/use-get-admin-by-id';

const EditAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const { data: admin } = useGetAdminById(id!);
  const { mutate } = useEditAdmin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { Option } = Select;
  const [form] = useForm();

  useEffect(() => {
    if (admin) {
      form.setFieldsValue({
        username: admin.username,
        email: admin.email,
        role: admin.role,
      });
    }
  }, [admin, form]);

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
      id: id!,
      username: values.username,
      email: values.email,
      role: values.role,
      isActive: true,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success('Admin Yangilandi');
        navigate('/super-admin');
        setLoading(false);
      },
      onError: (err: inputErrT) => {
        handleError(err.data?.errors || {});
        setLoading(false);
        toast.error('Adminni Yangilashda Xatolik');
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
          label="User Name"
          name="username"
          rules={[
            { required: true, message: 'Username kiritilishi shart' },
            { min: 4, message: 'Login kamida 4 ta belgi bo‘lishi kerak' },
          ]}
        >
          <Input placeholder="User Name kiriting" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'email kiritish majburiy',
            },
            {
              type: 'email',
              message: "To'g'ri email kiriting",
            },
          ]}
        >
          <Input placeholder="Email kiriting" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Role tanlang' }]}
        >
          <Select placeholder="Role tanlang">
            <Option value="ADMIN">ADMIN</Option>
            <Option value="SELLER">SELLER</Option>
          </Select>
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
export default EditAdmin;
