import { memo } from 'react'
import Sort from './svg/sort.svg'

interface ButtonSortedProps {
  clickHandlers: any
}

export const ButtonSorted = ({ clickHandlers }: ButtonSortedProps): JSX.Element => {
  return (
    <button data-cy="todo-sort-button" onClick={clickHandlers} className='border-[1px] border-gray-300 rounded-full'>
        <SortIcon />
    </button>
  )
}

const SortIcon = memo(function SortIcon () {
  return (
    <img src={Sort} alt="sort-icon" width={45} />
  )
})
