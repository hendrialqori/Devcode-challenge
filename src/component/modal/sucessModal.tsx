import { DoneIcon } from '@/assets/icon/doneIcon';
import { Wrapper } from './wrapper';

interface ModalDoneProps {
  isOpen: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalSuccess = ({ isOpen }: ModalDoneProps): JSX.Element => {
  return (
    <Wrapper isShow={isOpen}>
      <div className='modal-done-open modal-done' data-cy='modal-information'>
        <div className='bg-white flex gap-3 items-center px-7 py-2 rounded-md'>
          <DoneIcon />
          <p>Activity berhasil dihapus</p>
        </div>
      </div>
    </Wrapper>
  );
};
