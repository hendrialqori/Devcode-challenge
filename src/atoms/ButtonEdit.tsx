import { memo } from 'react'
import Pencil from '../atoms/svg/pencil.svg'
import { useStoreContext } from '../context/store'

interface ButtonEditProps {
  types: 'small' | 'large'
  clickHandlers?: () => void
}
const ButtonEdit = ({ types, clickHandlers }: ButtonEditProps): JSX.Element => {
  const { state } = useStoreContext()
  return (
    <button onClick={clickHandlers} disabled={state?.toggleSorted}>
        <PencilIcon types={types} />
    </button>
  )
}
const PencilIcon = memo(function PencilIcon ({ types }: ButtonEditProps): JSX.Element {
  let Size
  switch (types) {
    case 'small':
      Size = 'w-4'
      break
    case 'large':
      Size = 'w-5'
      break
    default:
      Size = 'w-3'
  }
  return (
    <img src={Pencil} className={Size} alt="pencil-icon" />
  )
})

export default ButtonEdit
