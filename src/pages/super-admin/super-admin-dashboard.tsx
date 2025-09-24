import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomeTable from '../../components/custome-table/custome-table';
import { useGetAdmin } from '../../crud-admins/query/useGetQuery';
import type { adminT } from '../../types/types';

const SuperAdminDashboard = () => {
  const { data, isLoading } = useGetAdmin();

  const navigate = useNavigate();

  const mappedData: { username: string; email: string }[] = Array.isArray(data)
    ? data.map((item: adminT) => ({
        id: item.id,
        username: item.username,
        email: item.email,
      }))
    : [];

  return (
    <div>
      <div className="lg:mb-[25px]">
        <Button
          onClick={() => navigate('/super-admin/add-admin')}
          type="primary"
        >
          Admin Qo'shish
        </Button>
      </div>

      <CustomeTable dataSource={mappedData} loading={isLoading} />
    </div>
  );
};

export default SuperAdminDashboard;
