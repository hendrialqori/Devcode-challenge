import { useEffect, useState } from 'react';
import { PriorityColorRound } from '@/component/priorityColorRound';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ButtonDelete } from '@/component/button/deleteButton';

import { useStoreContext } from '@/context/store';

import * as API from '@/middleware';
import { PencilIcon } from '@/assets/icon/penciIcon';

import type { Todo } from '@/types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TodoItem = ({
  id,
  title,
  is_active,
  priority,
  actionDelete,
  actionUpdate,
}: Todo): JSX.Element => {
  const [isChecked, setCheked] = useState<boolean>(
    is_active === 1 ? false : true
  );

  const { state, dispatch } = useStoreContext();

  useEffect(() => {
    setCheked(is_active === 1 ? false : true);
  }, [is_active]);

  const queryClient = useQueryClient();

  const update = useMutation(API.updateCheckedTodo, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['todos']);
    },
  });

  const handleChecked = (): void => {
    setCheked((prev) => !prev);
    update.mutate({ id, checkedValue: isChecked! });
  };

  return (
    <li
      data-cy='todo-item'
      key={id}
      className='w-full bg-white rounded-md shadow-md flex justify-between items-center px-6 py-5 mt-2'
    >
      <div className='flex items-center gap-3'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleChecked}
          className='du-checkbox du-checkbox-xs rounded-none du-checkbox-primary'
          disabled={state?.toggleSorted}
          data-cy='todo-item-checkbox'
        />
        <PriorityColorRound types={priority} />
        <h2
          data-cy='todo-item-title'
          className={`${isChecked ? 'line-through text-gray-400' : null}`}
        >
          {title}
        </h2>
        <button
          onClick={() => actionUpdate({ id, title, priority })}
          data-cy='todo-item-edit-button'
        >
          <PencilIcon types='small' />
        </button>
      </div>
      <ButtonDelete
        onClick={() => actionDelete({ id, title })}
        data-cy='todo-item-delete-button'
      />
    </li>
  );
};
