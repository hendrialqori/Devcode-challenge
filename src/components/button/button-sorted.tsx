import { SortIcon } from '@/assets/icon/sortIcon';

type Props = {
  onClick: () => void
}

export const ButtonSorted = ({ onClick }: Props)=> {
  return (
    <button
      data-cy='todo-sort-button'
      onClick={onClick}
      className='border-[1px] border-gray-300 rounded-full'
    >
      <SortIcon />
    </button>
  );
};
