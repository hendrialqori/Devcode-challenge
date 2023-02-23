import { useStoreContext } from '@/context/store';
import {
  toggleModal,
  changeFormData,
  resetFormData,
  resetEdiTodo,
} from '@/context/actions';
import { PriorityDropDown } from '@/component/priorityDropDown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Teleport } from '../teleport';

import * as API from '@/middleware';

export const ModalForm = (): JSX.Element => {
  const { state, dispatch } = useStoreContext();

  const { id } = useParams();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeFormData(dispatch, {
      ...state.formData,
      title: e.target.value,
    });
  };

  const handlePriority = (p: string): void => {
    changeFormData(dispatch, {
      ...state.formData,
      priority: p,
    });
  };

  const queryClient = useQueryClient();

  const PostTodos = useMutation(API.postTodos, {
    onSuccess: () => {
      resetFormData(dispatch);

      toggleModal(dispatch);

      queryClient.invalidateQueries(['todos']);
    },
  });
  const UpdateTodos = useMutation(API.updateTodos, {
    onSuccess: () => {
      resetFormData(dispatch);
      toggleModal(dispatch);
      resetEdiTodo(dispatch);
      void queryClient.invalidateQueries(['todos']);
    },
  });

  const handleSumbmitForm = (): any => {
    if (state.editTodoItem._id === null) {
      PostTodos.mutate({
        activity_group_id: id!,
        title: state.formData.title,
        priority: state.formData.priority,
      });
      return;
    }

    UpdateTodos.mutate({
      id: state.editTodoItem._id,
      title: state.formData.title,
      priority: state.formData.priority,
    });
  };

  const toggleModalFunc = (): void => {
    toggleModal(dispatch);
    resetFormData(dispatch);
  };
  return (
    <Teleport isActive={state.toggleModal} clickOutside={toggleModalFunc}>
      <div
        onClick={(e) => e.stopPropagation()}
        className='rounded-md relative w-6/12 h-max bg-white mt-24'
        data-cy='modal-add'
      >
        <header className='flex items-center justify-between p-5 border-b-[1px] border-gray-300'>
          <h3 className='text-md font-semibold'>Tambah List Item</h3>
          <button onClick={toggleModalFunc} className='text-lg font-bold'>
            ✕
          </button>
        </header>
        <section className='p-5 border-b-[1px] grid gap-6'>
          <div className='grid gap-2 '>
            <label className='text-xs font-semibold mb-2' htmlFor='t'>
              Nama List Item
            </label>
            <input
              value={state.formData.title}
              onChange={handleTitle}
              className='rounded-md p-3 border-[1px] border-gray-400 outline-sky-400'
              id='t'
              type='text'
              data-cy='modal-add-name-input'
            />
          </div>
          <div className='grid gap-2 '>
            <label className='text-xs font-semibold'>PRIORITY</label>
            <PriorityDropDown handlePriority={handlePriority} />
          </div>
        </section>
        <footer className='px-5 py-4 text-right'>
          <button
            disabled={state.formData.title.length === 0}
            onClick={handleSumbmitForm}
            className='py-2 px-5 rounded-full text-white bg-sky-500'
            data-cy='modal-add-save-button'
          >
            Simpan
          </button>
        </footer>
      </div>
    </Teleport>
  );
};
