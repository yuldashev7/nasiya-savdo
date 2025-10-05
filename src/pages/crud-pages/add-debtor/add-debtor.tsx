import { toast } from 'react-toastify';
import CustomeForm from '../../../components/form/form';
import { useCreateDebtor } from '../../../crud-debtor/mutation/use-create-debtor';
import { Button, Form, Input, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { debtorT, storeT } from '../../../types/types';
import { useAuth } from '../../../hooks/use-auth/use-auth';
import { useGetStore } from '../../../crud-store/query/use-get-store';

const AddDebtor = () => {
  const navigate = useNavigate();
  const { mutate } = useCreateDebtor();
  const { Option } = Select;
  const { user } = useAuth();
  const { data } = useGetStore();

  const handleNavigate = () => {
    if (user?.role === 'STORE') {
      return navigate('/store-dashboard');
    } else if (user?.role === 'ADMIN') {
      return navigate('/admin/store-dashboard');
    } else if (user?.role === 'SUPER ADMIN') {
      return navigate('/super-admin/store-dashboard');
    }
  };

  const onSubmit = (values: Omit<debtorT, 'id'>) => {
    console.log(values.storeId);

    const formData = new FormData();

    let storeId: any;

    if (user?.role === 'STORE') {
      storeId = localStorage.getItem('storeId');
    } else if (user?.role === 'ADMIN' || user?.role === 'SUPER ADMIN') {
      storeId = values.storeId as string;

      if (!storeId) {
        toast.error('Store tanlanmagan');
        return;
      }
    }

    formData.append('fullName', values.fullName || '');
    formData.append('address', values.address || '');
    formData.append('description', values.description || '');
    formData.append('phoneNumber', values.phoneNumber || '');
    formData.append('storeId', storeId);
    console.log(values);

    if ((values.imageDebtor as any)?.[0]?.originFileObj) {
      formData.append(
        'imageDebtor',
        (values.imageDebtor as any)[0].originFileObj
      );
    }
    mutate(formData, {
      onSuccess: () => {
        navigate('/store-dashboard');
        handleNavigate();
        toast.success('Yangi qarzdor qo‘shildi');
      },
      onError: () => toast.error('Xatolik yuz berdi'),
    });
  };

  return (
    <div className="sm:px-[10px] sm:pt-[20px] md:px-[15px]">
      <Button onClick={handleNavigate} className="mb-[10px]">
        Ortga Qaytish
      </Button>
      <CustomeForm
        onSubmit={onSubmit}
        isDebtor={true}
        extraFields={
          <>
            {(user?.role === 'ADMIN' || user?.role === 'SUPER ADMIN') && (
              <Form.Item label="Store" name="storeId">
                <Select placeholder="Store tanlang">
                  {(data as storeT[])?.map((store) => (
                    <Option key={store.id} value={store.id}>
                      {store.fullName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <Form.Item
              label="Manzil"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Manzil kiriting" />
            </Form.Item>

            <Form.Item label="Tavsif" name="description">
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
              <Input
                maxLength={12}
                addonBefore="+998"
                placeholder="90-123-45-67"
              />
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
          </>
        }
      />
    </div>
  );
};
export default AddDebtor;
