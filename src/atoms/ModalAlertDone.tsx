import { memo } from 'react'
import Done from '../atoms/svg/done-circle.svg'

interface ModalDoneProps {
  isOpen: boolean
  data_cy?: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalDone = ({ isOpen, data_cy = 'modal-information' }: ModalDoneProps): JSX.Element => {
  return (
    <div className={ isOpen ? 'modal-done-open modal-done' : 'modal-done'} data-cy={data_cy}>
        <div className='bg-white flex gap-3 items-center px-7 py-2 rounded-md'>
            <DoneIcon />
            <p>Activity berhasil dihapus</p>
        </div>
    </div>
  )
}

const DoneIcon = memo(function DoneIcon () {
  return (
    <img src={Done} alt="done-icon" />
  )
})

export default ModalDone
