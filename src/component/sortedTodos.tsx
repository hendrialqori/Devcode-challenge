import { useState } from 'react';
import { CheckListIcon } from '@/assets/icon/checklistIcon';
import { NewerIcon } from '@/assets/icon/newerIcon';
import { OlderIcon } from '@/assets/icon/olderIcon';
import { FromAIcon } from '@/assets/icon/a_zIcon';
import { FromZIcon } from '@/assets/icon/z_aIcon';
import { UnCompleteIcon } from '@/assets/icon/uncompleteIcon';

import { choosingTypeSortedFunc, toggleSorted } from '@/context/actions';
import { useStoreContext } from '@/context/store';

interface sort {
  id: number;
  title: string;
  icon: JSX.Element;
  isChoose: boolean;
}

const Sorted: sort[] = [
  {
    id: 1,
    title: 'Terbaru',
    icon: <NewerIcon />,
    isChoose: true,
  },
  {
    id: 2,
    title: 'Terlama',
    icon: <OlderIcon />,
    isChoose: false,
  },
  {
    id: 3,
    title: 'A-Z',
    icon: <FromAIcon />,
    isChoose: false,
  },
  {
    id: 4,
    title: 'Z-A',
    icon: <FromZIcon />,
    isChoose: false,
  },
  {
    id: 5,
    title: 'Belum selesai',
    icon: <UnCompleteIcon />,
    isChoose: false,
  },
];

export const SortedTodos = () => {
  const { state, dispatch } = useStoreContext();
  const [sorted, setSorted] = useState(Sorted);

  const handleChoosing = ({
    id,
    title,
  }: {
    id: number;
    title: string;
  }): void => {
    setSorted((prev) =>
      prev.map((sort) => {
        return sort.id === id
          ? { id, title: sort.title, icon: sort.icon, isChoose: true }
          : { ...sort, isChoose: false };
      })
    );
    choosingTypeSortedFunc(dispatch, title);
    toggleSorted(dispatch);
  };

  return (
    <>
      {state.toggleSorted ? (
        <section className='absolute bg-white top-[180px] border-y-[1px] border-gray-300 rounded-lg w-44'>
          {sorted.map((sort) => (
            <button
              data-cy='sort-selection'
              onClick={() => handleChoosing({ id: sort.id, title: sort.title })}
              key={sort.id}
              className='flex items-center justify-between p-3 border-x-[1px] border-b-[1px] border-gray-300 w-full'
            >
              <div className='flex items-center gap-2'>
                {sort.icon}
                <p className='text-sm'>{sort.title}</p>
              </div>
              {sort.isChoose && <CheckListIcon />}
            </button>
          ))}
        </section>
      ) : null}
    </>
  );
};
