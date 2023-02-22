import { DoneIcon } from '@/assets/icon/doneIcon';

interface ModalDoneProps {
  isOpen: boolean;
  data_cy?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalSuccess = ({
  isOpen,
  data_cy = 'modal-information',
}: ModalDoneProps): JSX.Element => {
  return (
    <div
      className={isOpen ? 'modal-done-open modal-done' : 'modal-done'}
      data-cy={data_cy}
    >
      <div className='bg-white flex gap-3 items-center px-7 py-2 rounded-md'>
        <DoneIcon />
        <p>Activity berhasil dihapus</p>
      </div>
    </div>
  );
};
