import { Fragment, memo, useState } from 'react'
import TodoItem from '../moleculs/TodoItem'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useStoreContext } from '../context/store'
import ModalAlertDelete from './ModalAlertDelete'
import { openModalAlertDelete, deleteTodoItem, triggeredUpdateTodo, toggleModal } from '../context/actions'
import EmptyTodos from '../atoms/svg/empty2.svg'
import ModalDone from '../atoms/ModalAlertDone'
import { useParams } from 'react-router-dom'

const getTodos = async ({ id }: { id: string | undefined }): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const URL = `https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`
  const request = await fetch(URL)

  if (!request.ok) {
    throw new Error('Failed to fetch data from server')
  }
  return await request.json()
}

const deleteItemTodo = async ({ id }: { id: number }): Promise<any> => {
  const URL = `https://todo.api.devcode.gethired.id/todo-items/${id}`
  const request = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })

  if (!request.ok) {
    throw new Error('Failed to fetch data from server')
  }
  return await request.json()
}

const Todos: React.FC = (): JSX.Element => {
  const { id } = useParams()
  const { state, dispatch } = useStoreContext()
  const { data, isLoading } = useQuery(['todos', state?.chooseTypeSorted, state.triggeredUpdateTodo], async () => await getTodos({ id }), {
    staleTime: 100,
    cacheTime: 100
  })
  const queryClient = useQueryClient()
  const [isOpenModalDone, setOpenModalDone] = useState<boolean>(false)

  const handleModalDone = (): void => {
    setOpenModalDone(true)
    setTimeout(() => {
      setOpenModalDone(false)
    }, 1500)
  }

  const deleteTodo = useMutation(['todos', state.deleteTodoItem._id], deleteItemTodo, {
    onSuccess: () => {
      openModalAlertDelete(dispatch)
      // Using triggeredUpdateTodo(dispatch) untuk loading
      triggeredUpdateTodo(dispatch)
      handleModalDone()
      void queryClient.invalidateQueries()
    }
  })
  const deleteTodoItemFunc = (): void => {
    deleteTodo.mutate({ id: state.deleteTodoItem._id })
  }

  const cencelDelete = (): void => {
    openModalAlertDelete(dispatch)
    deleteTodoItem(dispatch, {
      _id: 0,
      title: ''
    })
  }

  let Todos
  switch (state?.chooseTypeSorted) {
    case 'Terbaru':
      Todos = data?.data.sort((a: any, b: any) => b.id - a.id)
      break
    case 'Terlama':
      Todos = data?.data.sort((a: any, b: any) => a.id - b.id)
      break
    case 'A-Z':
      Todos = data?.data.sort((a: any, b: any) => a.title.localeCompare(b.title))
      break
    case 'Z-A':
      Todos = data?.data.sort((a: any, b: any) => b.title.localeCompare(a.title))
      break
    case 'Belum selesai':
      Todos = data?.data.sort((a: any, b: any) => (((a.is_active) as number) !== 0) ? -1 : 1)
      break
    default:
      Todos = data?.data
  }
  return (
    <Fragment>
      <ModalDone isOpen={isOpenModalDone} />
      {isLoading && <progress className="du-progress w-56"></progress>}
          { Todos?.length === 0
            ? <EmptyTodosIcon dispatch={dispatch} />
            : Todos?.map((todo: any, i: number) => (
          <TodoItem key={i} {...todo} />
            ))}
      <ModalAlertDelete
        text='Apakah anda yakin menghapus List Item'
        title={state.deleteTodoItem.title}
        deleteHandler={() => deleteTodoItemFunc()}
        deleteCencel={() => cencelDelete()}
      />
    </Fragment>
  )
}

const EmptyTodosIcon = memo(function EmptyTodosIcon ({ dispatch }: { dispatch: any }) {
  return (
    <img src={EmptyTodos} className="w-[45%] pt-5 mx-auto cursor-pointer" alt="empty-girl" onClick={() => toggleModal(dispatch)} data-cy="todo-empty-state" />
  )
})

export default Todos
