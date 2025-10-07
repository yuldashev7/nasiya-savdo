import { Modal } from 'antd';
import type { OptionModalT } from '../../types/types';
import { useGetDebtor } from '../../crud-debtor/query/use-get-debtor';

const OptionModal = ({ onClose, isOpen, storeId }: OptionModalT) => {
  const { data } = useGetDebtor();
  const filterData = data?.filter((item) => item.storeId === storeId);
  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        title={filterData?.length ? 'Sotuvchilar' : ''}
        closable={{ 'aria-label': 'Custom Close Button' }}
      >
        {filterData?.length ? (
          filterData.map((item) => (
            <p
              key={item.id}
              className="text-[15px] shadow py-[4px] px-[6px] mb-[8px] mr-[22px] hover:bg-gray-50 transition rounded-md"
            >
              {item.fullName}
            </p>
          ))
        ) : (
          <p>Bu do‘konga tegishli sotuvchi topilmadi</p>
        )}
      </Modal>
    </div>
  );
};
export default OptionModal;
