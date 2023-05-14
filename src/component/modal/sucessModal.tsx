import { memo } from 'react';
import { DoneIcon } from '@/assets/icon/doneIcon';
import { Wrapper } from './wrapper';

interface ModalDoneProps {
  isOpen: boolean;
  clickOutside: () => void;
}

export const ModalSuccess = memo(
  ({ isOpen, clickOutside }: ModalDoneProps): JSX.Element => {
    return (
      <Wrapper isShow={isOpen} clickOutside={clickOutside}>
        <div
          className='bg-white flex gap-3 items-center px-7 py-2 rounded-md z-10 h-max my-auto'
          data-cy='modal-information'
        >
          <DoneIcon />
          <p>Activity berhasil dihapus</p>
        </div>
      </Wrapper>
    );
  }
);
