import React from 'react';
import { CheckListIcon } from '@/assets/icon/checklistIcon';
import { choosingTypeSortedFunc } from '@/context/actions';
import { useStoreContext } from '@/context/store';
import { sortItem } from '@/constants/sort-item';

type Props = {
  isShow: boolean;
  onClose: () => void
}

export const SortTodo = ({ isShow, onClose }: Props) => {
  const { dispatch } = useStoreContext();

  const [sorted, setSorted] = React.useState(sortItem);

  const handleChooseSortType = (params: { id: number; title: string }) =>
    () => {
      setSorted(prev =>
        prev.map((sort) =>
          sort.id === params.id
            ? { id: params.id, title: sort.title, icon: sort.icon, isChoose: true }
            : { ...sort, isChoose: false }
        )
      )
      choosingTypeSortedFunc(dispatch, params.title);
      onClose()
    }

  return (
    <>
      {isShow ? (
        <section
          className='absolute bg-white top-[180px] border-y-[1px] border-gray-300 rounded-lg w-44'
        >
          {sorted.map((sort) => (
            <button
              data-cy='sort-selection'
              onClick={handleChooseSortType({ id: sort.id, title: sort.title })}
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
}
