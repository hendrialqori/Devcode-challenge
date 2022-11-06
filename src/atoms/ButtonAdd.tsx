import { memo } from 'react'
import Plus from './svg/plusIcon.svg'

interface ButtonProps {
  clickHandlers?: () => void
  data_cy: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ButtonAdd = ({ clickHandlers, data_cy }: ButtonProps): JSX.Element => {
  return (
    <button className='flex items-center bg-sky-500 hover:bg-sky-600 p-2 px-3 rounded-full' onClick={clickHandlers} data-cy={data_cy}>
        <PlusIcon />
        <p className="text-white">Tambah</p>
    </button>
  )
}

const PlusIcon = memo(function PlusIcon () {
  return (
        <img src={Plus} alt="plus-icon" />
  )
})
