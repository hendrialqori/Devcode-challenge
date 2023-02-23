import { useEffect, useState } from 'react';
import { PriorityColorRound } from '@/component/priorityColorRound';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ButtonDelete } from '@/component/button/deleteButton';
import { ButtonEdit } from '@/component/button/editButton';
import { useStoreContext } from '@/context/store';
import {
  editTodoItemId,
  toggleModal,
  changeFormData,
  openModalAlertDelete,
  deleteTodoItem,
} from '@/context/actions';

import * as API from '@/middleware';

interface TodoItemProps {
  id: number;
  title: string;
  is_active: number | boolean;
  priority: 'very-high' | 'high' | 'normal' | 'low' | 'very-low';
}

interface UpdateTodosProps {
  id: number;
  checkedValue: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TodoItem = ({
  id,
  title,
  is_active,
  priority,
}: TodoItemProps): JSX.Element => {
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

  const deleteTodo = (id: number, title: string): void => {
    openModalAlertDelete(dispatch);
    deleteTodoItem(dispatch, {
      _id: id,
      title,
    });
  };

  const handleEditTodo = (): void => {
    editTodoItemId(dispatch, {
      _id: id,
      priorityValue: priority,
    });
    toggleModal(dispatch);
    changeFormData(dispatch, {
      title,
      priority,
    });
  };

  return (
    <div
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
          className={`${isChecked && 'line-through text-gray-400'}`}
        >
          {title}
        </h2>
        <ButtonEdit clickHandlers={() => handleEditTodo()} types='small' />
      </div>
      <ButtonDelete
        clickHandlers={() => deleteTodo(id, title)}
        data_cy={'todo-item-delete-button'}
      />
    </div>
  );
};
