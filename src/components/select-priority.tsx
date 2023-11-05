import { useEffect, useState } from 'react';
import { UpArrowIcon } from '@/assets/icon/upArrowIcon';
import { DownArrowIcon } from '@/assets/icon/downArrowIcon';
import { PriorityColor } from './priority-color';
import { Priority as TPriority } from '@/types';

type Props = {
  value: string;
  onChange: (priority: TPriority) => void;
}

interface Priority {
  id: number;
  title: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  types: TPriority;
}
const Priorities: Priority[] = [
  {
    id: 1,
    title: 'Very High',
    types: 'very-high',
  },
  {
    id: 2,
    title: 'High',
    types: 'high',
  },
  {
    id: 3,
    title: 'Medium',
    types: 'normal',
  },
  {
    id: 4,
    title: 'Low',
    types: 'low',
  },
  {
    id: 5,
    title: 'Very Low',
    types: 'very-low',
  },
];

export const SelectPriority = ({ value, onChange }: Props) => {
  const [isOpenDD, setOpenDD] = useState<boolean>(false);

  const [priorityIdx, setPriorityIdx] = useState<number>(1);

  const handleChangePriority = (priority: { index: number, type: TPriority }) =>
    () => {
      setPriorityIdx(priority.index);

      onChange(priority.type);

      setOpenDD(false);
    }


  useEffect(() => {
    const priority = Priorities.find((obj) => obj.types === value);
    if (priority != null) {
      setPriorityIdx(priority.id);
    }
  }, [value]);

  return (
    <>
      <div
        data-cy='modal-add-priority-dropdown'
        className='border-[1px] w-[180px] flex justify-between py-[.60rem] px-3 cursor-pointer'
        role='listbox'
        tabIndex={0}
        onClick={() => setOpenDD((prev: boolean) => !prev)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) setOpenDD(true);
        }}
      >
        <h1 className='flex items-center gap-5'>
          <PriorityColor type={Priorities[priorityIdx - 1]?.types} />
          {Priorities[priorityIdx - 1]?.title}
        </h1>
        {isOpenDD ? <UpArrowIcon /> : <DownArrowIcon />}
      </div>
      {isOpenDD && (
        <div className='absolute bg-white'>
          {Priorities.map((obj: Priority, i) => (
            <button
              key={i}
              type='button'
              data-cy='modal-add-priority-item'
              className='border-[1px] w-[180px] flex items-center gap-5 py-[.60rem] px-3 cursor-pointer'
              onClick={handleChangePriority({ index: obj.id, type: obj.types })}
            >
              <PriorityColor type={obj.types} />
              <p className='text-gray-600'>{obj.title}</p>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
