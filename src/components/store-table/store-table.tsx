import { Button, Table, Tag } from 'antd';
import type { adminT, columnsT, tableT } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UseDeleteStore from '../../crud-store/mutation/use-delete-store';
import { useState } from 'react';
import { useAuth } from '../../hooks/use-auth/use-auth';

const Storetable = ({ dataSource, loading }: tableT) => {
  const navigate = useNavigate();
  const [loadingId, setLoadingID] = useState<string | null>(null);
  const { mutate: deleteAdmin } = UseDeleteStore();
  const { user } = useAuth();
  const handleDelete = (id: string) => {
    setLoadingID(id);
    deleteAdmin(id, {
      onSuccess: () => {
        setLoadingID(null);
        toast.success("Do'kon O'chirildi");
      },
      onError: () => {
        toast.error("Do'kon Qo'shishda Xatolik");
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
      width: '60px',
      render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'name',
      width: '180px',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '220px',
    },
    {
      title: 'Wallet',
      dataIndex: 'wallet',
      key: 'wallet',
      width: '150px',
      render: (value: number) =>
        value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' UZS',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '180px',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '130px',
      render: (text: string | undefined) =>
        text ? new Date(text).toLocaleDateString() : '—',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '130px',
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '160px',
      render: (_: any, record: adminT) => (
        <div className="flex items-center gap-[10px]">
          <Button
            className="w-[70px]"
            danger
            loading={loadingId == record.id}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
          <Button
            className="w-[70px]"
            type="primary"
            onClick={() =>
              navigate(
                user?.role === 'SUPER ADMIN'
                  ? `/super-admin/edit-store/${record.id}`
                  : `/admin/edit-store/${record.id}`
              )
            }
          >
            Edit
          </Button>
        </div>
      ),
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '100px',
      render: (isActive: boolean | undefined) => (
        <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Ha' : 'Yo‘q'}</Tag>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        loading={loading}
        rowKey="id"
        columns={columns}
        pagination={{
          pageSize,
          total: dataSource.length,
        }}
        scroll={{ x: '1200px' }}
      />
    </div>
  );
};
export default Storetable;
