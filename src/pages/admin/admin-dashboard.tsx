import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { dataT } from '../../types/types';
import { useGetStore } from '../../crud-store/query/use-get-store';
import Storetable from '../../components/store-table/store-table';
import { useAuth } from '../../hooks/use-auth/use-auth';

const AdminDashboard = () => {
  const { data, isLoading } = useGetStore();
  const navigate = useNavigate();
  const { user } = useAuth();

  const mappedData: dataT[] = Array.isArray(data)
    ? data.map((item: dataT) => ({
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        phoneNumber: item.phoneNumber,
        role: item.role,
        wallet: item.wallet,
        password: item.password,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }))
    : [];

  return (
    <div>
      <Button
        type="primary"
        onClick={() =>
          navigate(
            user?.role === 'SUPER ADMIN'
              ? '/super-admin/add-store'
              : '/admin/add-store'
          )
        }
        className="mb-[20px] sm:w-[100px] sm:!text-[12px] sm:!font-[500]"
      >
        Do'kon Qo'shish
      </Button>

      <Storetable dataSource={mappedData} loading={isLoading} />
    </div>
  );
};
export default AdminDashboard;
