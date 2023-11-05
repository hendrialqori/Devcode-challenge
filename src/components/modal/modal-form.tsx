import React from 'react';
import { SelectPriority } from '@/components/select-priority';
import { useParams } from 'react-router-dom';
import { Wrapper } from './wrapper';
import { cn } from '@/helpers/cn';
import * as API from '@/apis/services/todo'

import type { Priority } from '@/types';


type Props = {
  ishow: boolean;
  mode: 'create' | 'update';
  todoData?: {
    id: number | null;
    title: string;
    priority: Priority
  }
  onClose: () => void
}

type Payload = {
  title: string;
  priority: string
}

const initialTodo = {
  title: '',
  priority: 'very-high' as Priority
}

export const ModalForm = ({ ishow, mode, todoData, onClose }: Props) => {
  const { id } = useParams();

  const { mutate: addTodo, isLoading: addTodoStatus } = API.useAddTodo()

  const { mutate: updateTodo, isLoading: updateTodoStatus } = API.useUpdateTodo<Payload>()

  const [todo, setTodo] = React.useState(initialTodo)

  const wrapperRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (
      mode === 'update' &&
      Object.keys(todoData!).length
    ) {
      setTodo({
        title: todoData?.title ?? '',
        priority: todoData?.priority ?? 'very-high'
      })
    }
  }, [mode, todoData])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(prev => ({ ...prev, title: e.target.value }))
  };

  const handlePriority = (priority: Priority): void => {
    setTodo(prev => ({ ...prev, priority }))
  };

  const handelSuccessMutation = () => {
    setTodo(initialTodo)
    onClose()
  }

  const handleAddTodo = () => {
    addTodo({
      activity_group_id: Number(id),
      title: todo.title,
      priority: todo.priority
    },
      {
        onSuccess: () => handelSuccessMutation()
      }
    )
  }

  const handleUpdateTodo = () => {
    updateTodo({
      id: todoData?.id as number,
      payload: {
        title: todo.title,
        priority: todo.priority
      }
    }, {
      onSuccess: () => handelSuccessMutation()
    })
  }

  const handleSumbmitForm = (): void => {
    if (mode === 'create') return handleAddTodo()
    if (mode === 'update') return handleUpdateTodo()
  };

  // useClickOutside(wrapperRef, ishow ? onClose : () => { })

  return (
    <Wrapper
      isShow={ishow}
    >
      <div
        ref={wrapperRef}
        className='rounded-md relative w-6/12 h-max bg-white'
        data-cy='modal-add'
      >
        <header className='flex items-center justify-between p-5 border-b-[1px] border-gray-300'>
          <h3 className='text-md font-semibold'>Tambah List Item</h3>
          <button onClick={onClose} className='text-lg font-bold'>
            ✕
          </button>
        </header>
        <section className='p-5 border-b-[1px] grid gap-6'>
          <div className='grid gap-2 '>
            <label className='text-xs font-semibold mb-2' htmlFor='t'>
              Nama List Item
            </label>
            <input
              value={todo.title}
              onChange={handleTitleChange}
              className='rounded-md p-3 border-[1px] border-gray-400 outline-sky-400'
              id='t'
              type='text'
              data-cy='modal-add-name-input'
            />
          </div>
          <div className='grid gap-2 '>
            <label className='text-xs font-semibold'>PRIORITY</label>
            <SelectPriority
              value={todo.priority}
              onChange={handlePriority}
            />
          </div>
        </section>
        <footer className='px-5 py-4 text-right'>
          <button
            disabled={addTodoStatus || updateTodoStatus}
            onClick={handleSumbmitForm}
            className={cn(
              'py-2 px-5 rounded-full text-white',
              todo.title.length ? 'bg-sky-500' : 'bg-sky-500/50'
            )}
            data-cy='modal-add-save-button'
          >
            {addTodoStatus || updateTodoStatus ? 'loading...' : 'Simpan'}
          </button>
        </footer>
      </div>
    </Wrapper>
  );
}
