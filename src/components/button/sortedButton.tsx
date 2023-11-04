import { SortIcon } from '@/assets/icon/sortIcon';

interface ButtonSortedProps {
  clickHandlers: any;
}

export const ButtonSorted = ({
  clickHandlers,
}: ButtonSortedProps): JSX.Element => {
  return (
    <button
      data-cy='todo-sort-button'
      onClick={clickHandlers}
      className='border-[1px] border-gray-300 rounded-full'
    >
      <SortIcon />
    </button>
  );
};
