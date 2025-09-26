import { Button, Table, Tag } from 'antd';
import type { adminT, columnsT, tableT } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UseDeleteStore from '../../crud-store/mutation/useDeleteStore';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth/useAuth';

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
        toast.success("Store O'chirildi");
      },
      onError: () => {
        toast.error("Store Qo'shishda Xatolik");
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
      render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Wallet',
      dataIndex: 'wallet',
      key: 'wallet',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string | undefined) =>
        text ? new Date(text).toLocaleDateString() : '—',
    },
    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Actions',
      render: (_: any, record: adminT) => {
        return (
          <div className="flex items-center gap-[20px]">
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
        );
      },
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
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
        scroll={{ x: 'full-content' }}
      />
    </div>
  );
};
export default Storetable;
