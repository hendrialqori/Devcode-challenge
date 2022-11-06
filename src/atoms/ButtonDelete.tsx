import { memo } from 'react'
import Trash from './svg/trash.svg'

interface ButtonDeleteProps {
  clickHandlers?: () => void
  data_cy: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ButtonDelete = ({ clickHandlers, data_cy }: ButtonDeleteProps): JSX.Element => {
  return (
    <button onClick={clickHandlers} data-cy={data_cy}>
        <TrashIcon />
    </button>
  )
}

const TrashIcon = memo(function TrashIcon () {
  return (
    <img src={Trash} alt="trash-icon" />
  )
})

export default ButtonDelete
