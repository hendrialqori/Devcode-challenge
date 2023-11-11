import React from 'react';
import { PriorityColor } from '@/components/priority-color';
import { useMutation } from '@tanstack/react-query';
import { ButtonDelete } from '@/components/button/button-delete';
import { useStoreContext } from '@/context/store';
import { useUpdateTodo } from '@/apis/services/todo';
import { PencilIcon } from '@/assets/icon/penciIcon';
import type { Priority, Todo } from '@/types';

type Params = {
  id: number | null,
  title: string;
  priority: Priority
}

type Props = Todo & {
  onUpdate: (params: Params) => void;
  onDelete: (params: Omit<Params, 'priority'>) => void
}

type Payload = {
  is_active: number
}

export const TodoItem = (props: Props) => {

  const { id, title, priority, is_active, onUpdate, onDelete } = props

  const { state } = useStoreContext();

  const { mutate: updateTodo } = useUpdateTodo<Payload>()

  const [isChecked, setCheked] = React.useState<boolean>(is_active === 0 ? true : false);

  React.useEffect(() => {
    setCheked(is_active === 0 ? true : false);
  }, [is_active]);


  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCheked((prev) => !prev);

    updateTodo({
      id: id,
      payload: {
        is_active: e.target.checked ? 0 : 1
      }
    }, {
      onSuccess: () => setCheked
    })
    
  };

  const handleUpdate = () => {
    onUpdate({ id, title, priority })
  }

  const handleDelete = () => onDelete({ id, title })

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
        <PriorityColor type={priority} />
        <h2
          data-cy='todo-item-title'
          className={`${isChecked ? 'line-through text-gray-400' : null}`}
        >
          {title}
        </h2>
        <button
          onClick={handleUpdate}
          data-cy='todo-item-edit-button'
        >
          <PencilIcon types='small' />
        </button>
      </div>
      <ButtonDelete
        onClick={handleDelete}
        data-cy='todo-item-delete-button'
      />
    </li>
  );
}

