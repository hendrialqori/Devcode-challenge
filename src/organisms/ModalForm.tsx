import { useStoreContext } from '../context/store'
import { toggleModal, changeFormData, resetFormData, resetEdiTodo, triggeredUpdateTodo } from '../context/actions'
import PriorityDropDown from '../moleculs/PriorityDD'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react'

const ModalForm = (): JSX.Element => {
  const { state, dispatch } = useStoreContext()
  const { id } = useParams()

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeFormData(dispatch, {
      ...state.formData,
      title: e.target.value
    })
  }
  const handlePriority = (p: string): void => {
    changeFormData(dispatch, {
      ...state.formData,
      priority: p
    })
  }

  const postTodos = async (id: string | undefined): Promise<any> => {
    const request = await fetch('https://todo.api.devcode.gethired.id/todo-items', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        activity_group_id: id,
        title: state.formData.title,
        priority: state.formData.priority
      })
    })
    if (!request.ok) {
      throw new Error('Failed to add new todo')
    }
    return await request.json()
  }
  const updateTodos = async (): Promise<any> => {
    const request = await fetch(`https://todo.api.devcode.gethired.id/todo-items/${(state.editTodoItem._id) as number}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title: state.formData.title,
        priority: state.formData.priority
      })
    })
    if (!request.ok) {
      throw new Error('Failed to add new todo')
    }
    return await request.json()
  }

  const queryClient = useQueryClient()
  const PostTodos = useMutation(['todos', state.formData.title], async () => await postTodos(id), {
    onSuccess: () => {
      resetFormData(dispatch)
      toggleModal(dispatch)
      triggeredUpdateTodo(dispatch)
      void queryClient.invalidateQueries()
    }
  })
  const UpdateTodos = useMutation(['todos', state.formData.title], updateTodos, {
    onSuccess: () => {
      resetFormData(dispatch)
      toggleModal(dispatch)
      resetEdiTodo(dispatch)
      triggeredUpdateTodo(dispatch)
      void queryClient.invalidateQueries()
    }
  })

  const handleSumbmitForm = (): any => {
    if (state.editTodoItem._id === null) {
      PostTodos.mutate()
      return -1
    }

    UpdateTodos.mutate()
    return -1
  }

  const toggleModalFunc = (): void => {
    toggleModal(dispatch)
    resetFormData(dispatch)
  }
  return (
    <Fragment>
      {state.toggleModal && (
      <div className="du-modal du-modal-open" data-cy="modal-add" onClick={toggleModalFunc}>
          <div onClick={(e) => e.stopPropagation()} className="rounded-md relative w-6/12 bg-white">
              <header className='flex items-center justify-between p-5 border-b-[1px] border-gray-300'>
                  <h3 className="text-md font-semibold">Tambah List Item</h3>
                  <button onClick={toggleModalFunc} className="text-lg font-bold">✕</button>
              </header>
              <section className='p-5 border-b-[1px] grid gap-6'>
                  <div className='grid gap-2 '>
                      <label className='text-xs font-semibold mb-2' htmlFor="t">Nama List Item</label>
                      <input value={state.formData.title} onChange={handleTitle} className='rounded-md p-3 border-[1px] border-gray-400 outline-sky-400' id='t' type="text" data-cy="modal-add-name-input"/>
                  </div>
                  <div className='grid gap-2 '>
                      <label className='text-xs font-semibold'>PRIORITY</label>
                      <PriorityDropDown handlePriority={handlePriority} />
                  </div>
              </section>
              <footer className='px-5 py-4 text-right'>
                  <button disabled={state.formData.title.length === 0} onClick={handleSumbmitForm} className='py-2 px-5 rounded-full text-white bg-sky-500' data-cy="modal-add-save-button">Simpan</button>
              </footer>
          </div>
      </div>
      )}
    </Fragment>
  )
}

export default ModalForm
