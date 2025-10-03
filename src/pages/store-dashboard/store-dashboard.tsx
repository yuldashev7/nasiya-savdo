import { Button, Table } from 'antd';
import type { debtorT } from '../../types/types';
import { useGetDebtor } from '../../crud-debtor/query/use-get-debtor';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth/use-auth';
import { useDeleteDebtor } from '../../crud-debtor/mutation/use-delete-debtor';
import { useState } from 'react';
import { toast } from 'react-toastify';
// import { useGetStore } from '../../crud-store/query/useStore';
// import { useGetDebtorPagination } from '../../crud-debtor/query/useGetDebtorePagination';

const StoreDashboard = () => {
  const { data, isLoading } = useGetDebtor();
  // const { data: stores } = useGetDebtorPagination();
  const [loadingId, setLoadingID] = useState<string | null>(null);

  const { mutate: deleteDebtor } = useDeleteDebtor();

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDelete = (id: any) => {
    setLoadingID(id);
    console.log('deleteId', id);

    deleteDebtor(id, {
      onSuccess: () => {
        setLoadingID(null);
        toast.success("Qarzdor O'chirildi");
      },
      onError: () => {
        toast.error("Qarzdor O'shirishda Xatolik");
        setLoadingID(null);
      },
    });
  };

  const handleNavigate = () => {
    if (user?.role === 'STORE') {
      return navigate('/store-dashboard/add-debtor');
    } else if (user?.role === 'ADMIN') {
      return navigate('/admin/add-debtor');
    } else if (user?.role === 'SUPER ADMIN') {
      return navigate('/super-admin/add-debtor');
    }
  };

  const handleEditNavigate = (id: string) => {
    if (user?.role === 'STORE') {
      return navigate(`/store-dashboard/edit-debtor/${id}`);
    }
  };

  const mappedData: debtorT[] = Array.isArray(data)
    ? data.map((item: debtorT) => ({
        id: item.id,
        fullName: item.fullName,
        address: item.address,
        description: item.description,
        phoneNumber: item.phoneNumber,
        storeId: item.storeId,
        imageDebtor: item.imageDebtor,
        createdAt: item.createdAt,
      }))
    : [];

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (_: any, __: any, index: any) => index + 1,
    },
    {
      title: 'imageDebtor',
      dataIndex: 'imageDebtor',
      key: 'imageDebtor',
    },
    {
      title: 'Ism',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Telefon Raqam',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) =>
        text ? new Date(text).toLocaleDateString() : '—',
    },

    // {
    //   title: 'Store',
    //   key: 'store',
    //   render: (_text: string, record: debtorT) => {
    //     const store = stores?.find((s: any) => s.id === record.storeId);
    //     return store?.name || record.storeId;
    //   },
    // },
    {
      title: 'Action',
      render: (_: any, record: debtorT) => {
        return (
          <div className="flex items-center gap-[10px]">
            <Button
              onClick={() => handleEditNavigate(record.id)}
              type="primary"
            >
              Edit
            </Button>
            <Button
              loading={loadingId === record.id}
              onClick={() => handleDelete(record.id)}
              danger
              className="w-[60px]"
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mt-[50px]">
      <Button
        type="primary"
        onClick={handleNavigate}
        className={`mb-[40px] ml-[20px] !text-[12px] !font-[500] ${
          user?.role === 'SUPER ADMIN' || user?.role === 'ADMIN'
            ? 'mt-[-40px]'
            : 'mt-[5]'
        }`}
      >
        Qarzdor Qo'shish
      </Button>
      <Table
        dataSource={mappedData}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        scroll={{ x: '1200px' }}
      />
    </div>
  );
};
export default StoreDashboard;
