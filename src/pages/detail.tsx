import Layout from '../templates/Layouts'
import Todos from '../organisms/Todos'
import { ButtonAdd } from '../atoms/ButtonAdd'
import { ButtonSorted } from '../atoms/ButtonSorted'
import SortedValue from '../moleculs/SortedValue'
import { toggleSorted, toggleModal } from '../context/actions'
import { useStoreContext } from '../context/store'
import { Fragment, useCallback, useEffect, useState } from 'react'
import ModalForm from '../organisms/ModalForm'
import ButtonEdit from '../atoms/ButtonEdit'
import { useParams } from 'react-router-dom'
import ButtonBackHome from '../atoms/ButtonBackHome'

const fetchTodosTitle = async (id: string | undefined): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const URL = `https://todo.api.devcode.gethired.id/activity-groups/${id}`
  const request = await fetch(URL)

  if (!request.ok) {
    throw new Error('Failed to fetch data from server')
  }
  return await request.json()
}

const editTodoTitle = async ({ id, title }: { id: string | undefined, title: string }): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const URL = `https://todo.api.devcode.gethired.id/activity-groups/${id}`
  const request = await fetch(URL, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      title
    })
  })

  if (!request.ok) {
    throw new Error('Failed to fetch data from server')
  }
  return await request.json()
}

const Detail: React.FC = () => {
  const { dispatch } = useStoreContext()
  const [title, setTitle] = useState<string>('')
  const [isEditTitle, setEditTitle] = useState<boolean>(false)
  const { id } = useParams()

  useEffect(() => {
    void (async () => {
      await fetchTodosTitle(id).then(res => setTitle(res.title))
    })()
  }, [])

  const toggleSortedFunc = useCallback(() => toggleSorted(dispatch), [dispatch])
  const toggleModalFunc = useCallback(() => toggleModal(dispatch), [dispatch])

  const handleSubmit = async (): Promise<any> => {
    setEditTitle(false)
    try {
      await editTodoTitle({ id, title })
    } catch (error) {
      throw new Error('Error while submit form')
    }
  }
  return (
    <Layout>
      <section className='container py-5'>
        <header className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <ButtonBackHome />
            { !isEditTitle
              ? <h1 className='text-3xl font-bold' onClick={() => setEditTitle(true)} data-cy="todo-title">{title}</h1>
              : <Fragment>
              <input value={title} onChange={e => setTitle(e.target.value)} type="text" className='border-b-[1px] border-gray-300 outline-none bg-transparent px-1 text-3xl font-bold' />
              <ButtonEdit clickHandlers={handleSubmit} types='large' /></Fragment>
              }
            { isEditTitle || <ButtonEdit clickHandlers={() => setEditTitle(true)} types='large' /> }
          </div>
          <div className='flex items-center gap-5' aria-label='button-wrapper'>
            <ButtonSorted clickHandlers={toggleSortedFunc} />
            <SortedValue />
            {/* Sorted components will open when triggered from ButtonSorted */}

            <ButtonAdd clickHandlers={toggleModalFunc} data_cy={'todo-add-button'} />
            <ModalForm />
            {/* Toggle Modal triggered */}
          </div>
        </header>
        <section className='my-10'>
          <Todos />
        </section>
      </section>
    </Layout>
  )
}

export default Detail
