import { Link, useNavigate } from 'react-router-dom';
import { ArrowIcon } from '@/assets/icon/arrowIcon';
import React, { useCallback } from 'react';
import { PencilIcon } from '@/assets/icon/penciIcon';
import { ButtonSorted } from '@/components/button/sortedButton';
import { SortedTodos } from '@/components/sortedTodos';
import { ButtonAdd } from '@/components/button/addButton';
import { toggleSorted } from '@/context/actions';
import { useStoreContext } from '@/context/store';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  createTodo: () => void;
  title: string;
  isEditTitle: boolean;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditTitle: React.Dispatch<React.SetStateAction<boolean>>;
  updateTitleAction: (e: React.SyntheticEvent) => void;
}

export const Header = ({
  createTodo,
  isEditTitle,
  title,
  setTitle,
  setEditTitle,
  updateTitleAction,
}: Props) => {
  const queryClient = useQueryClient();

  const { dispatch } = useStoreContext();

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
            <form onSubmit={updateTitleAction}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                className='relative border-b-[1px] border-gray-300 outline-none bg-transparent px-1 text-3xl font-bold'
                autoFocus
                required
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
