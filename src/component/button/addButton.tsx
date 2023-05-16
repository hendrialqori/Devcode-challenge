import { PlusIcon } from '@/assets/icon/plusIcon';

type Props = React.ComponentProps<'button'> & {
  isLoading?: boolean;
};

export const ButtonAdd: React.FC<Props> = ({ isLoading, ...rest }) => {
  return (
    <button
      className='flex items-center bg-sky-500 hover:bg-sky-600 p-2 px-3 rounded-full'
      {...rest}
    >
      {!isLoading ? (
        <>
          <PlusIcon />
          <p className='text-white'>Tambah</p>
        </>
      ) : (
        <p className='text-white'>loading</p>
      )}
    </button>
  );
};
