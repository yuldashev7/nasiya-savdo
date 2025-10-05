import { Button, Table, Image } from 'antd';
import type { debtorT } from '../../types/types';
import { useGetDebtor } from '../../crud-debtor/query/use-get-debtor';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth/use-auth';
import { useDeleteDebtor } from '../../crud-debtor/mutation/use-delete-debtor';
import { useState } from 'react';
import { toast } from 'react-toastify';

const StoreDashboard = () => {
  const { data, isLoading } = useGetDebtor();
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
    } else if (user?.role === 'ADMIN') {
      navigate(`/admin/edit-debtor/${id}`);
    } else if (user?.role === 'SUPER ADMIN') {
      navigate(`/super-admin/edit-debtor/${id}`);
    }
  };
  console.log(data);

  const mappedData: debtorT[] = data ?? [];

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (_: any, __: any, index: any) => index + 1,
    },
    {
      title: 'Image',
      dataIndex: 'imagesDebtor',
      key: 'imagesDebtor',
      render: (imageDebtor: { imageUrl: string }[]) =>
        imageDebtor && imageDebtor.length > 0 ? (
          <Image
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
            src={encodeURI(imageDebtor[0].imageUrl)}
            preview={false}
          />
        ) : (
          <span>No Image</span>
        ),
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

    {
      title: 'Action',
      render: (_: any, record: debtorT) => {
        return (
          <div className="flex items-center gap-[10px]">
            <Button
              className="w-[80px]"
              onClick={() => handleEditNavigate(record.id)}
              type="primary"
            >
              Edit
            </Button>
            <Button
              loading={loadingId === record.id}
              onClick={() => handleDelete(record.id)}
              danger
              className="w-[80px]"
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
