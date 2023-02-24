import { PlusIcon } from '@/assets/icon/plusIcon';

type Props = React.ComponentProps<'button'>;

export const ButtonAdd: React.FC<Props> = ({ ...rest }) => {
  return (
    <button
      className='flex items-center bg-sky-500 hover:bg-sky-600 p-2 px-3 rounded-full'
      {...rest}
    >
      <PlusIcon />
      <p className='text-white'>Tambah</p>
    </button>
  );
};
