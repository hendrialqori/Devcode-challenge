import React from 'react';
import { TodoItem } from '@/pages/detail/components/todo-item';
import { useStoreContext } from '@/context/store';
import { ModalDelete } from '@/components/modal/modal-delete';
import { EmptyTodos } from '@/components/empty-todos';
import { ModalSuccess } from '@/components/modal/modal-success';
import { useParams } from 'react-router-dom';
import * as API from '@/apis/services/todo'
import { ModalForm } from '@/components/modal/modal-form';

import type { Priority } from '@/types';

const initialTodo = {
  id: null as number | null,
  title: '',
  priority: 'very-high' as Priority
}

export const Todos = () => {
  const { id } = useParams();

  const { state } = useStoreContext();

  const { data: todos } = API.useGetTodos({ activity_id: Number(id) })

  const { mutate: deleteTodo, isLoading: deleteTodoStatus } = API.useDeleteTodo()

  const [todo, setTodo] = React.useState(initialTodo);

  const [formMode, setFormMode] = React.useState<'create' | 'update'>('create')

  const [isShowModalForm, setIsShowModalForm] = React.useState<boolean>(false);

  const [isShowModalDelete, setIsShoModalDelete] = React.useState<boolean>(false);

  const [isOpenModalSuccess, setOpenModalSuccess] = React.useState<boolean>(false);


  const handleCreateTodo = () => {
    setIsShowModalForm(true)
    setFormMode('create')
  }

  const handleUpdateTodo = (params: typeof initialTodo) => {
    setTodo(params)
    setIsShowModalForm(true)
    setFormMode('update')
  }

  const handleDeleteTodo = (params: { id: number | null; title: string }) => {
    setTodo(prev => ({ ...prev, ...params }))
    setIsShoModalDelete(true)
  }


  const handleDelete = () => {
    deleteTodo({ id: todo.id as number },
      {
        onSuccess: () => {
          setOpenModalSuccess(true);
          setIsShoModalDelete(false)
        },
      }
    );
  };

  const handleResetModalState = () => {
    setIsShowModalForm(false)
    setIsShoModalDelete(false)
    setOpenModalSuccess(false)

    setTodo(initialTodo)
    setFormMode('create')
  }

  const todosFiltering = React.useMemo(() => {
    const sortType =
      state.chooseTypeSorted as 'Terbaru' | 'Terlama' | 'A-Z' | 'Z-A' | 'Belum selesai'

    const temp = todos?.data

    switch (sortType) {
      case 'Terbaru':
        return temp?.sort((a, b) => b.id - a.id);
      case 'Terlama':
        return temp?.sort((a, b) => a.id - b.id);
      case 'A-Z':
        return temp?.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      case 'Z-A':
        return temp?.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      case 'Belum selesai':
        return temp?.sort((a: any, b: any) =>
          (a.is_active as number) !== 0 ? -1 : 1
        );
      default:
        return temp
    }

  }, [todos?.data, state.chooseTypeSorted])



  return (
    <>
      {
        todos?.data.length === 0
          ? <EmptyTodos onClick={handleCreateTodo} />
          : <ul className='my-10'>
            {todosFiltering?.map((todo, i) => (
              <TodoItem
                key={i}
                {...todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </ul>
      }

      <ModalForm
        isShow={isShowModalForm}
        mode={formMode}
        todoData={todo}
        onClose={handleResetModalState}
      />

      <ModalDelete
        isShow={isShowModalDelete}
        text='Apakah anda yakin menghapus List Item'
        title={todo.title}
        isLoading={deleteTodoStatus}
        onDelete={handleDelete}
        onCencel={handleResetModalState}
      />

      <ModalSuccess
        isShow={isOpenModalSuccess}
        onClose={handleResetModalState}
      />
    </>
  );
};
