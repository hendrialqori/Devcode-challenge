import { memo, useCallback, useState } from 'react';
import { TodoItem } from '@/component/card/todoItem';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useStoreContext } from '@/context/store';
import { ModalDelete } from '@/component/modal/deleteModal';
import EmptyTodos from '@/assets/svg/empty2.svg';
import { ModalSuccess } from '@/component/modal/sucessModal';
import { useParams } from 'react-router-dom';

import * as API from '@/middleware';

import type { ActivityItem, Todo } from '@/types';

type Props = {
  createTodo: () => void;
  updateTodo: () => void;
  setDataForm: React.Dispatch<
    React.SetStateAction<Pick<Todo, 'id' | 'title' | 'priority'>>
  >;
};

export const Todos: React.FC<Props> = ({
  createTodo,
  updateTodo,
  setDataForm,
}): JSX.Element => {
  const { id } = useParams();

  const { state } = useStoreContext();

  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: ['todos', state?.chooseTypeSorted],
    queryFn: async () => await API.getTodos({ id }),
  });

  const { mutate: deleteTodo } = useMutation(API.deleteItemTodo);

  const [todo, setTodo] = useState<Pick<Todo, 'id' | 'title'>>({
    id: 0,
    title: '',
  });

  const [isOpenModalSuccess, setOpenModalSuccess] = useState<boolean>(false);

  const handleDelete = useCallback(() => {
    deleteTodo(
      {
        id: todo.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['todos']);

          // clear todo state
          setTodo({
            id: 0,
            title: '',
          });

          setOpenModalSuccess(true);
        },
      }
    );
  }, [todo]);

  const handleGetDataUpdate = useCallback(
    (params: Pick<Todo, 'id' | 'title' | 'priority'>) => {
      setDataForm({ ...params });
      updateTodo();
    },
    []
  );

  const handleGetDataDelete = useCallback(
    (params: Omit<ActivityItem, 'created_at'>) => {
      setTodo(params);
    },
    []
  );

  const cencelDelete = useCallback((): void => {
    setTodo({
      id: 0,
      title: '',
    });
  }, []);

  const closeModalSuccess = useCallback(() => {
    setOpenModalSuccess(false);
  }, []);

  let Todos;
  switch (state?.chooseTypeSorted) {
    case 'Terbaru':
      Todos = data?.data.sort((a: any, b: any) => b.id - a.id);
      break;
    case 'Terlama':
      Todos = data?.data.sort((a: any, b: any) => a.id - b.id);
      break;
    case 'A-Z':
      Todos = data?.data.sort((a: any, b: any) =>
        a.title.localeCompare(b.title)
      );
      break;
    case 'Z-A':
      Todos = data?.data.sort((a: any, b: any) =>
        b.title.localeCompare(a.title)
      );
      break;
    case 'Belum selesai':
      Todos = data?.data.sort((a: any, b: any) =>
        (a.is_active as number) !== 0 ? -1 : 1
      );
      break;
    default:
      Todos = data?.data;
  }

  return (
    <>
      {status === 'loading' ? (
        'loading ....'
      ) : Todos.length === 0 ? (
        <img
          src={EmptyTodos}
          className='w-[45%] pt-5 mx-auto cursor-pointer'
          alt='empty-girl'
          onClick={createTodo}
          data-cy='todo-empty-state'
        />
      ) : (
        <ul className='my-10'>
          {Todos.map((todo: any, i: number) => (
            <TodoItem
              key={i}
              {...todo}
              actionUpdate={handleGetDataUpdate}
              actionDelete={handleGetDataDelete}
            />
          ))}
        </ul>
      )}

      <ModalDelete
        isOpen={!!todo.id && !!todo.title}
        text='Apakah anda yakin menghapus List Item'
        title={todo.title}
        deleteHandler={handleDelete}
        deleteCencel={cencelDelete}
      />

      <ModalSuccess
        isOpen={isOpenModalSuccess}
        clickOutside={closeModalSuccess}
      />
    </>
  );
};
