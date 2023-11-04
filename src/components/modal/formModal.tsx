import { memo } from 'react';
import { PriorityDropDown } from '@/components/priorityDropDown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Wrapper } from './wrapper';

import * as API from '@/middleware';
import { PriorityType, Todo } from '@/types';

interface Props {
  ishow: boolean;
  mode: 'create' | 'update';
  toggleForm: () => void;
  dataForm: Pick<Todo, 'id' | 'title' | 'priority'>;
  setDataForm: React.Dispatch<
    React.SetStateAction<Pick<Todo, 'id' | 'title' | 'priority'>>
  >;
}

export const ModalForm = memo(
  ({ ishow, mode, dataForm, toggleForm, setDataForm }: Props): JSX.Element => {
    const { id } = useParams();

    const queryClient = useQueryClient();

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setDataForm((prev) => ({
        ...prev,
        title: e.target.value,
      }));
    };

    const handlePriority = (priority: PriorityType): void => {
      setDataForm((prev) => ({
        ...prev,
        priority,
      }));
    };

    const { mutate: createTodo, isLoading: loadCreate } = useMutation(
      API.postTodos,
      {
        onSuccess: () => {
          setDataForm({
            id: 0,
            title: '',
            priority: 'very-high',
          });

          toggleForm();

          queryClient.invalidateQueries(['todos']);
        },
      }
    );
    const { mutate: updateTodo, isLoading: loadUpdate } = useMutation(
      API.updateTodos,
      {
        onSuccess: () => {
          setDataForm({
            id: 0,
            title: '',
            priority: 'very-high',
          });

          toggleForm();

          void queryClient.invalidateQueries(['todos']);
        },
      }
    );

    const handleSumbmitForm = (): void => {
      if (mode === 'create') {
        createTodo({
          activity_group_id: id!,
          title: dataForm.title,
          priority: dataForm.priority,
        });
        return;
      }

      if (mode === 'update') {
        updateTodo({
          id: dataForm.id,
          title: dataForm.title,
          priority: dataForm.priority,
        });

        return;
      }
    };

    return (
      <Wrapper isShow={ishow} clickOutside={toggleForm}>
        <div
          className='rounded-md relative w-6/12 h-max bg-white mt-24'
          data-cy='modal-add'
        >
          <header className='flex items-center justify-between p-5 border-b-[1px] border-gray-300'>
            <h3 className='text-md font-semibold'>Tambah List Item</h3>
            <button onClick={toggleForm} className='text-lg font-bold'>
              ✕
            </button>
          </header>
          <section className='p-5 border-b-[1px] grid gap-6'>
            <div className='grid gap-2 '>
              <label className='text-xs font-semibold mb-2' htmlFor='t'>
                Nama List Item
              </label>
              <input
                value={dataForm.title}
                onChange={handleTitle}
                className='rounded-md p-3 border-[1px] border-gray-400 outline-sky-400'
                id='t'
                type='text'
                data-cy='modal-add-name-input'
              />
            </div>
            <div className='grid gap-2 '>
              <label className='text-xs font-semibold'>PRIORITY</label>
              <PriorityDropDown
                value={dataForm.priority}
                handlePriority={handlePriority}
              />
            </div>
          </section>
          <footer className='px-5 py-4 text-right'>
            <button
              disabled={!dataForm.title || loadCreate || loadUpdate}
              onClick={handleSumbmitForm}
              className={`py-2 px-5 rounded-full text-white ${
                !dataForm.title ? 'bg-sky-500/50' : 'bg-sky-500 '
              } `}
              data-cy='modal-add-save-button'
            >
              {loadCreate || loadUpdate ? 'loading' : 'Simpan'}
            </button>
          </footer>
        </div>
      </Wrapper>
    );
  }
);
