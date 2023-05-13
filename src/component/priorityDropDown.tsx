import { useEffect, useState } from 'react';
import { UpArrowIcon } from '@/assets/icon/upArrowIcon';
import { DownArrowIcon } from '@/assets/icon/downArrowIcon';
import { PriorityColorRound } from './priorityColorRound';
import { useStoreContext } from '@/context/store';
import { PriorityType } from '@/types';

interface Props {
  priorityDefault: string;
  handlePriority: (priority: PriorityType) => void;
}

interface Priority {
  id: number;
  title: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  types: PriorityType;
}
const Priority: Priority[] = [
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

export const PriorityDropDown = ({
  priorityDefault,
  handlePriority,
}: Props): JSX.Element => {
  const [isOpenDD, setOpenDD] = useState<boolean>(false);

  const [priorityIdx, setPriorityIdx] = useState<number>(1);

  const handleChangeState = (
    priorityIdx: number,
    priorityTypes: PriorityType
  ): void => {
    setPriorityIdx(priorityIdx);

    handlePriority(priorityTypes);

    setOpenDD(false);
  };

  useEffect(() => {
    const priority = Priority.find((obj) => obj.types === priorityDefault);
    if (priority != null) {
      setPriorityIdx(priority.id);
    }
  }, [priorityDefault]);

  return (
    <>
      <div
        data-cy='modal-add-priority-dropdown'
        className='border-[1px] w-[180px] flex justify-between py-[.60rem] px-3'
        role='listbox'
        tabIndex={0}
        onClick={() => setOpenDD((prev: boolean) => !prev)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) setOpenDD(true);
        }}
        // aria-hidden='true'
      >
        <h1 className='flex items-center gap-5'>
          <PriorityColorRound types={Priority[priorityIdx - 1]?.types} />
          {Priority[priorityIdx - 1]?.title}
        </h1>
        {isOpenDD ? <UpArrowIcon /> : <DownArrowIcon />}
      </div>
      {isOpenDD && (
        <div className='absolute bg-white'>
          {Priority.map((obj: Priority, i) => (
            <span
              key={i}
              data-cy='modal-add-priority-item'
              className='border-[1px] w-[180px] flex items-center gap-5 py-[.60rem] px-3'
              role='listitem'
              tabIndex={0}
              onClick={() => handleChangeState(obj.id, obj.types)}
              onKeyDown={(e) => {
                if (e.keyCode === 13) handleChangeState(obj.id, obj.types);
              }}
            >
              <PriorityColorRound types={obj.types} />
              <p className='text-gray-600'>{obj.title}</p>
            </span>
          ))}
        </div>
      )}
    </>
  );
};
