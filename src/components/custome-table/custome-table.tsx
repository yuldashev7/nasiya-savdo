import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { adminT, columnsT, tableT } from '../../types/types';
import { useDeleteAdmin } from '../../crud-admins/mutation/use-delete-admin';

const CustomeTable = ({ dataSource, loading }: tableT) => {
  const { mutate: deleteAdmin } = useDeleteAdmin();
  const [loadingId, setLoadingID] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    setLoadingID(id);
    deleteAdmin(id, {
      onSuccess: () => {
        setLoadingID(null);
        toast.success("Admin o'chirildi");
      },
      onError: () => {
        toast.error("Admin qo'shishda xatolik");
        setLoadingID(null);
      },
    });
  };
  const pageSize = 10;

  const columns: columnsT[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '25%',
    },
    {
      title: 'Action',
      width: '25%',
      render: (_: any, record: adminT) => {
        return (
          <div className="flex items-center gap-[20px] ">
            <Button
              className="w-[80px]"
              type="primary"
              onClick={() => navigate(`/super-admin/admin/${record.id}`)}
            >
              EDIT
            </Button>
            <Button
              danger
              loading={loadingId == record.id}
              onClick={() => handleDelete(record.id)}
            >
              DELETE
            </Button>
          </div>
        );
      },
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '25%',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Ha' : 'Yo‘q'}</Tag>
      ),
    },
  ];
  return (
    <div>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize,
          total: dataSource.length,
        }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};
export default CustomeTable;
