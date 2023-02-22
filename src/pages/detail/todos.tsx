import { memo, useState } from 'react';
import { TodoItem } from '@/component/card/todoItem';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useStoreContext } from '@/context/store';
import { ModalDelete } from '@/component/modal/deleteModal';
import {
  openModalAlertDelete,
  deleteTodoItem,
  triggeredUpdateTodo,
  toggleModal,
} from '@/context/actions';
import EmptyTodos from '@/assets/svg/empty2.svg';
import { ModalSuccess } from '@/component/modal/sucessModal';
import { useParams } from 'react-router-dom';

import * as API from '@/middleware';

export const Todos: React.FC = (): JSX.Element => {
  const { id } = useParams();

  const { state, dispatch } = useStoreContext();

  const { data, isLoading } = useQuery({
    queryKey: ['todos', state?.chooseTypeSorted],
    queryFn: async () => await API.getTodos({ id }),
    cacheTime: 0,
  });

  const queryClient = useQueryClient();

  const [isOpenModalDone, setOpenModalDone] = useState<boolean>(false);

  const handleModalDone = (): void => {
    setOpenModalDone(true);
    setTimeout(() => {
      setOpenModalDone(false);
    }, 1500);
  };

  const deleteTodo = useMutation(
    ['todos', state.deleteTodoItem._id],
    API.deleteItemTodo,
    {
      onSuccess: () => {
        openModalAlertDelete(dispatch);
        triggeredUpdateTodo(dispatch);
        handleModalDone();
        void queryClient.invalidateQueries();
      },
    }
  );
  const deleteTodoItemFunc = (): void => {
    deleteTodo.mutate({ id: state.deleteTodoItem._id });
  };

  const cencelDelete = (): void => {
    openModalAlertDelete(dispatch);
    deleteTodoItem(dispatch, {
      _id: 0,
      title: '',
    });
  };

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
      <ModalSuccess isOpen={isOpenModalDone} />
      {isLoading && 'loading ....'}
      {Todos?.length === 0 ? (
        <EmptyTodosIcon dispatch={dispatch} />
      ) : (
        Todos?.map((todo: any, i: number) => <TodoItem key={i} {...todo} />)
      )}
      <ModalDelete
        text='Apakah anda yakin menghapus List Item'
        title={state.deleteTodoItem.title}
        deleteHandler={() => deleteTodoItemFunc()}
        deleteCencel={() => cencelDelete()}
      />
    </>
  );
};

const EmptyTodosIcon = memo(function EmptyTodosIcon({
  dispatch,
}: {
  dispatch: any;
}) {
  return (
    <img
      src={EmptyTodos}
      className='w-[45%] pt-5 mx-auto cursor-pointer'
      alt='empty-girl'
      onClick={() => toggleModal(dispatch)}
      data-cy='todo-empty-state'
    />
  );
});
