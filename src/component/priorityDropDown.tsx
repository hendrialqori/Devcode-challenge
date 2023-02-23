import { useEffect, useState } from 'react';
import { UpArrowIcon } from '@/assets/icon/upArrowIcon';
import { DownArrowIcon } from '@/assets/icon/downArrowIcon';
import { PriorityColorRound } from './priorityColorRound';
import { useStoreContext } from '@/context/store';

interface PriorityDDProps {
  handlePriority: (p: string) => void;
}

interface PriorityTypes {
  id: number;
  title: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  types: 'very-high' | 'high' | 'normal' | 'low' | 'very-low';
}
const Priority: PriorityTypes[] = [
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
  handlePriority,
}: PriorityDDProps): JSX.Element => {
  const [isOpenDD, setOpenDD] = useState<boolean>(false);

  const [priorityIdx, setPriorityIdx] = useState<number>(1);

  const { state, dispatch } = useStoreContext();

  const handleChangeState = (
    priorityIdx: number,
    priorityTypes: string
  ): void => {
    setPriorityIdx(priorityIdx);

    handlePriority(priorityTypes);

    setOpenDD(false);
  };

  useEffect(() => {
    const priority = Priority.find(
      (obj) => obj.types === state.editTodoItem.priorityValue
    );
    if (priority != null) {
      setPriorityIdx(priority.id);
    }
  }, [state.editTodoItem.priorityValue, dispatch]);

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
          {Priority.map((obj: PriorityTypes, i) => (
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
