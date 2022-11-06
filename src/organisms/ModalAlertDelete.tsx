import React, { Fragment, memo } from 'react'
import Alert from '../atoms/svg/alert.svg'
import { useStoreContext } from '../context/store'

interface ModalAlertDeleteProps {
  title: string
  text: string
  deleteHandler: () => void
  deleteCencel: () => void
}

const ModalAlertDelete = ({ title, text, deleteHandler, deleteCencel }: ModalAlertDeleteProps): JSX.Element => {
  const { state } = useStoreContext()

  const cencelModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation()
    deleteCencel()
  }

  const deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation()
    deleteHandler()
  }

  return (
    <Fragment>
      {state.openModalAlertDelete && (
        <div onClick={deleteCencel} className="du-modal du-modal-open" data-cy="modal-delete">
          <div className="rounded-md relative w-4/12 bg-white py-4">
            <header data-cy="modal-delete-icon" className='w-max mx-auto py-4'>
                <AlertIcon />
            </header>
            <section data-cy="modal-delete-title" className='text-center font-semibold py-4'>
                <p>{text}</p>
                <h3>&quot;{title}&quot;?</h3>
            </section>
            <div className='px-5 flex items-center justify-center gap-4 py-4'>
                <button data-cy="modal-delete-cencel-button" onClick={cencelModal} className='py-2 px-7 rounded-full bg-gray-200 font-semibold'>Batal</button>
                <button data-cy="modal-delete-confirm-button" onClick={deleteItem} className='py-2 px-7 rounded-full text-white bg-rose-500 font-semibold'>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}
const AlertIcon = memo(function AlertIcon () {
  return (
    <img src={Alert} className="w-[75%]" alt="alert-icon" />
  )
})
export default ModalAlertDelete
