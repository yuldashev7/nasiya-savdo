import { Button, Table, Image } from 'antd';
import type { debtorT } from '../../types/types';
import { useGetDebtor } from '../../crud-debtor/query/use-get-debtor';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth/use-auth';
import { useDeleteDebtor } from '../../crud-debtor/mutation/use-delete-debtor';
import { useState } from 'react';
import { toast } from 'react-toastify';
import LogOutIcon from '../../assets/icons/log-out-icon';

const StoreDashboard = () => {
  const { data, isLoading } = useGetDebtor();
  const [loadingId, setLoadingID] = useState<string | null>(null);

  const { mutate: deleteDebtor } = useDeleteDebtor();

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDelete = (id: any) => {
    setLoadingID(id);

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

  const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('storeId');
    navigate('/login');
    toast.success('Tizimdan muvaffaqqiyatli chiqdingiz');
  };

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
    <div className={`${user?.role === 'STORE' ? 'mt-[50px]' : ''}`}>
      <div className="flex justify-between">
        <Button
          type="primary"
          onClick={handleNavigate}
          className={`mb-[40px] ml-[20px] !text-[12px] !font-[500]`}
        >
          Qarzdor Qo'shish
        </Button>
        {user?.role === 'STORE' && (
          <Button
            danger
            onClick={removeToken}
            className="mr-7 sm:py-2 lg:p-4 flex items-center gap-2"
          >
            <LogOutIcon />
            Chiqish
          </Button>
        )}
      </div>
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
