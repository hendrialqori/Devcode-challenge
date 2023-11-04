import React from 'react';
import { AlertIcon } from '@/assets/icon/alertIcon';
import { Wrapper } from './wrapper';
import { useClickOutside } from '@/hooks/use-clickoutside';

interface Props {
  isOpen: boolean;
  title: string;
  text: string;
  isLoading: boolean;
  onDelete: () => void;
  onCencel: () => void;
}

export const ModalDelete = (props: Props) => {

  const { isOpen, title, text, isLoading, onDelete, onCencel } = props

  const wrapperRef = React.useRef<HTMLDivElement | null>(null)

  useClickOutside(wrapperRef, onCencel)

  return (
    <Wrapper isShow={isOpen} >
      <div
        ref={wrapperRef}
        className='rounded-md relative w-6/12 lg:w-4/12 h-max bg-white py-4'
        data-cy='modal-delete'
      >
        <div data-cy='modal-delete-icon' className='w-max mx-auto py-4'>
          <AlertIcon />
        </div>
        <div
          data-cy='modal-delete-title'
          className='text-center font-semibold py-4'
        >
          <p>{text}</p>
          <h3>&quot;{title}&quot;?</h3>
        </div>
        <div className='px-5 flex items-center justify-center gap-4 py-4'>
          <button
            onClick={onCencel}
            className='py-2 px-7 rounded-full bg-gray-200 font-semibold'
            data-cy='modal-delete-cancel-button'
          >
            Batal
          </button>
          <button
            onClick={onDelete}
            disabled={isLoading}
            className={
              `py-2 px-7 rounded-full text-white font-semibold ${isLoading ? 'bg-rose-500/50' : 'bg-rose-500'
              }`}
            data-cy='modal-delete-confirm-button'
          >
            {isLoading ? 'loading' : 'Hapus'}
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
