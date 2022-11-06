/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from 'react'
import PriorityColorRound from './PriorityColorRound'
import { useMutation, useQueryClient } from 'react-query'
import ButtonDelete from '../atoms/ButtonDelete'
import ButtonEdit from '../atoms/ButtonEdit'
import { useStoreContext } from '../context/store'
import { editTodoItemId, toggleModal, changeFormData, openModalAlertDelete, deleteTodoItem } from '../context/actions'

interface TodoItemProps {
  id: number
  title: string
  is_active: number | boolean
  priority: 'very-high' | 'high' | 'normal' | 'low' | 'very-low'
}

interface UpdateTodosProps {
  id: number
  checkedValue: boolean
}

const updateCheckedTodo = async ({ id, checkedValue }: UpdateTodosProps): Promise<TodoItemProps> => {
  const request = await fetch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, {
    method: 'PATCH',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({
      is_active: checkedValue
    })
  })

  if (!request.ok) {
    throw new Error('Checked invalid!')
  }
  return await request.json()
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const TodoItem = ({ id, title, is_active, priority }: TodoItemProps): JSX.Element => {
  const queryClient = useQueryClient()
  const update: any = useMutation(['todos', is_active], updateCheckedTodo, {
    onSuccess: () => {
      void queryClient.invalidateQueries()
    }
  })

  const [isChecked, setCheked] = useState<boolean>(is_active !== 1)
  const { state, dispatch } = useStoreContext()

  const handleChecked = (): void => {
    setCheked(prev => !prev)
    update.mutate({ id, checkedValue: isChecked })
  }

  const deleteTodo = (id: number, title: string): void => {
    openModalAlertDelete(dispatch)
    deleteTodoItem(dispatch, {
      _id: id,
      title
    })
  }

  const handleEditTodo = (): void => {
    editTodoItemId(dispatch, {
      _id: id,
      priorityValue: priority
    })
    toggleModal(dispatch)
    changeFormData(dispatch, {
      title, priority
    })
  }

  return (
    <section data-cy="todo-item" key={id} className="w-full bg-white rounded-md shadow-md flex justify-between items-center px-6 py-5 mt-2">
      <section className='flex items-center gap-3'>
        <input type="checkbox" checked={isChecked} onChange={handleChecked} className="du-checkbox du-checkbox-xs rounded-none du-checkbox-primary" disabled={state?.toggleSorted} data-cy="todo-item-checkbox" />
        <PriorityColorRound types={priority} />
        <h2 data-cy="todo-item-title" className={`${isChecked && 'line-through text-gray-400'}`}>{title}</h2>
        <ButtonEdit clickHandlers={() => handleEditTodo()} types='small' />
      </section>
      <ButtonDelete clickHandlers={() => deleteTodo(id, title)} data_cy={'todo-item-delete-button'} />
    </section>
  )
}

export default TodoItem
