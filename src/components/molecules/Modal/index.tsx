import {Modal as ModalMaterialUi} from '@mui/material';
import Image from 'next/image';
import {ReactNode} from 'react';
import {IcClosePurple} from '../../../../public/icons';

interface ModalInterface {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  type?: string;
}
const ModalComponent = (props: ModalInterface) => {
  const {open, onClose, children, title, type} = props;

  return (
    <ModalMaterialUi
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div
        className={
          type === 'small'
            ? 'bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] p-[20px]'
            : 'bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-[555px] p-[20px]'
        }>
        <div className="flex items-center justify-between">
          <div className="w-[20px] h-[20px]" />
          <div className="text-lg font-semibold text-black">{title}</div>
          <button className="text-purple-700 w-[20px] h-[20px]" onClick={onClose}>
            <Image src={IcClosePurple} height={20} width={20} alt="" />
          </button>
        </div>
        {children}
      </div>
    </ModalMaterialUi>
  );
};

export default ModalComponent;
