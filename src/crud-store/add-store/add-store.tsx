import {
  useCreateStore,
  type CreateStorePayload,
} from '../mutation/use-create-store';
import { Button } from 'antd';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import type { inputErrT } from '../../types/types';
import CustomeForm from '../../components/form/form';
import { useAuth } from '../../hooks/use-auth/use-auth';

const AddStore = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate } = useCreateStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handlenavigate = () => {
    if (user?.role === 'ADMIN') {
      return navigate('/admin');
    } else if (user?.role === 'STORE') {
      return navigate('/store-dashboard');
    } else if (user?.role === 'SUPER ADMIN') {
      return navigate('/super-admin/admin');
    }
  };

  const onSubmit = (values: CreateStorePayload) => {
    setLoading(true);
    const payload = { ...values, role: 'STORE', wallet: 0 };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Yangi Store Qo'shildi");
        navigate(
          user?.role === 'SUPER ADMIN' ? '/super-admin/admin' : '/admin'
        );
        setLoading(false);
      },
      onError: (err: inputErrT) => {
        toast.error("Yangi Store Qo'shishda Xatolik");
        if (err instanceof AxiosError) {
          const status = err.response?.status;
          if (status === 409) {
            toast.error('Bunday foydalanuvchi allaqachon mavjud!');
          } else if (status === 422) {
            toast.error("Ma'lumotlarni to‘g‘ri kiriting!");
          }
        }
        setLoading(false);
      },
    });
  };
  return (
    <div>
      <Button onClick={handlenavigate} className="mb-[20px] mt-[10px]">
        Ortga Qaytish
      </Button>
      <CustomeForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
};
export default AddStore;
