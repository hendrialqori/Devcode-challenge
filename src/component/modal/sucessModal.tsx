import { memo } from 'react';
import { DoneIcon } from '@/assets/icon/doneIcon';
import { Wrapper } from './wrapper';

interface ModalDoneProps {
  isOpen: boolean;
  clickOutside: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalSuccess = memo(
  ({ isOpen, clickOutside }: ModalDoneProps): JSX.Element => {
    return (
      <Wrapper isShow={isOpen} clickOutside={clickOutside}>
        <div
          className='flex justify-center items-center'
          data-cy='modal-information'
          onClick={clickOutside}
        >
          <div className='bg-white flex gap-3 items-center px-7 py-2 rounded-md h-max'>
            <DoneIcon />
            <p>Activity berhasil dihapus</p>
          </div>
        </div>
      </Wrapper>
    );
  }
);
