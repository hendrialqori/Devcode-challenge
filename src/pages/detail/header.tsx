import { Link, useParams } from 'react-router-dom';
import { ArrowIcon } from '@/assets/icon/arrowIcon';
import * as API from '@/middleware';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { PencilIcon } from '@/assets/icon/penciIcon';
import { ButtonSorted } from '@/component/button/sortedButton';
import { SortedTodos } from '@/component/sortedTodos';
import { ButtonAdd } from '@/component/button/addButton';
import { toggleSorted } from '@/context/actions';
import { useStoreContext } from '@/context/store';

interface Props {
  createTodo: () => void;
  isEditTitle: boolean;
  setEditTitle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ createTodo, isEditTitle, setEditTitle }: Props) => {
  const { dispatch } = useStoreContext();

  const { id } = useParams();

  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');

  const {} = useQuery({
    queryKey: ['detail-title'],
    queryFn: async () => await API.getTodosTitle(id),
    onSuccess: (data) => {
      setTitle(data.title);
    },
  });

  const { mutate: updateDetailTitle } = useMutation(API.editTodoTitle);

  const updateDetailTitleAction = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setEditTitle(false);
    updateDetailTitle(
      {
        id,
        title,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['detail-title']);
        },
      }
    );
  };

  const toggleSortedFunc = useCallback(
    () => toggleSorted(dispatch),
    [dispatch]
  );

  return (
    <div className='flex justify-between items-center' aria-label='top-side'>
      <div className='flex items-center gap-4'>
        <Link to='/' data-cy='todo-back-button'>
          <ArrowIcon />
        </Link>

        <div onClick={(e) => e.stopPropagation()}>
          {!isEditTitle ? (
            <div className='flex gap-3'>
              <h1
                className='text-3xl font-bold'
                onClick={(e) => {
                  setEditTitle(true);
                }}
                data-cy='todo-title'
              >
                {title}
              </h1>
              <button
                onClick={(e) => {
                  setEditTitle(true);
                }}
                data-cy='todo-title-edit-button'
              >
                <PencilIcon types='large' />
              </button>
            </div>
          ) : (
            <form onSubmit={updateDetailTitleAction}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                className='relative border-b-[1px] border-gray-300 outline-none bg-transparent px-1 text-3xl font-bold'
                autoFocus
              />
              <button type='submit'>
                <PencilIcon types='large' />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className='flex items-center gap-5' aria-label='button-wrapper'>
        <ButtonSorted clickHandlers={toggleSortedFunc} />
        <SortedTodos />
        {/* Sorted components will open when triggered from ButtonSorted */}
        <ButtonAdd onClick={createTodo} data-cy='todo-add-button' />
      </div>
    </div>
  );
};
