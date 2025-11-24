import { useState } from 'react';
import { Button, Modal } from 'antd';
import AdminType from '../modal-types/admin-type';
import StoreType from '../modal-types/store-type';

const CustomeModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<'ADMIN' | 'STORE' | null>(null);

  const handleClose = () => {
    setOpen(false);
    setType(null);
  };

  return (
    <div>
      <p
        onClick={() => setOpen(true)}
        className="text-right underline mb-3 font-medium text-sm text-primary -mt-3 cursor-pointer"
      >
        Parolni unutdingizmi?
      </p>

      <Modal open={open} onCancel={handleClose} footer={null} centered>
        {!type && (
          <>
            <h1 className="text-center md:my-[10px] md:text-[20px] md:font-[600] sm:my-[10px] sm:text-[16px] sm:font-[600]">
              Parolni tiklash
            </h1>
            <div className="flex items-center sm:gap-[30px] md:gap-[50px] justify-center sm:my-[20px]">
              <Button className="w-[100px]" onClick={() => setType('ADMIN')}>
                Admin
              </Button>
              <Button className="w-[100px]" onClick={() => setType('STORE')}>
                Do'kon
              </Button>
            </div>
          </>
        )}

        {type === 'ADMIN' && <AdminType onClose={handleClose} />}

        {type === 'STORE' && <StoreType onClose={handleClose} />}
      </Modal>
    </div>
  );
};
export default CustomeModal;
