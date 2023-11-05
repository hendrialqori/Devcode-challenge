import React from 'react';
import { DoneIcon } from '@/assets/icon/doneIcon';
import { Teleport, Wrapper } from './teleport';
import { useClickOutside } from '@/hooks/use-clickoutside';

type Props = {
  isShow: boolean;
  onClose: () => void
}

export const ModalSuccess = ({ isShow, onClose}: Props) => {

  const wrapperRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <Teleport show={isShow} onClose={onClose}>
      <div
        className='bg-white flex gap-3 items-center px-7 py-2 rounded-md z-10 h-max my-auto'
        data-cy='modal-information'
      >
        <DoneIcon />
        <p>Activity berhasil dihapus</p>
      </div>
    </Teleport>
  );
}

