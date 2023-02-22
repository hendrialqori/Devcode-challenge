import { PlusIcon } from '@/assets/icon/plusIcon';

interface ButtonProps {
  clickHandlers?: () => void;
  data_cy: string;
}

export const ButtonAdd = ({
  clickHandlers,
  data_cy,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className='flex items-center bg-sky-500 hover:bg-sky-600 p-2 px-3 rounded-full'
      onClick={clickHandlers}
      data-cy={data_cy}
    >
      <PlusIcon />
      <p className='text-white'>Tambah</p>
    </button>
  );
};
