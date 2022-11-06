import { memo, useEffect, useState } from 'react'
import PriorityColorRound from './PriorityColorRound'
import Up from '../atoms/svg/up-arrow.svg'
import Down from '../atoms/svg/down-arrow.svg'
import { useStoreContext } from '../context/store'

interface PriorityDDProps {
  handlePriority: (p: string) => void
}

interface PriorityTypes {
  id: number
  title: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low'
  types: 'very-high' | 'high' | 'normal' | 'low' | 'very-low'
}
const Priority: PriorityTypes[] = [
  {
    id: 1,
    title: 'Very High',
    types: 'very-high'
  },
  {
    id: 2,
    title: 'High',
    types: 'high'
  },
  {
    id: 3,
    title: 'Medium',
    types: 'normal'
  },
  {
    id: 4,
    title: 'Low',
    types: 'low'
  },
  {
    id: 5,
    title: 'Very Low',
    types: 'very-low'
  }
]

export default function PriorityDropDown ({ handlePriority }: PriorityDDProps): JSX.Element {
  const [isOpenDD, setOpenDD] = useState<boolean>(false)
  const [priorityIdx, setPriorityIdx] = useState<number>(1)
  const { state, dispatch } = useStoreContext()

  const handleChangeState = (priorityIdx: number, priorityTypes: string): void => {
    setPriorityIdx((prev) => priorityIdx)
    handlePriority(priorityTypes)
    setOpenDD(false)
  }

  useEffect(() => {
    const priority = Priority.find(obj => obj.types === state.editTodoItem.priorityValue)
    if (priority != null) {
      setPriorityIdx(priority.id)
    }
  }, [state.editTodoItem.priorityValue, dispatch])

  return (
    <section>
      {/* data-cy="dropdown-target" */}
      <div data-cy="modal-add-priority-dropdown" onClick={() => setOpenDD((prev: boolean) => !prev)} className="border-[1px] w-[180px] flex justify-between py-[.60rem] px-3" role="button" tabIndex={0} aria-hidden="true">
        <h1 className="flex items-center gap-5">
          <PriorityColorRound types={Priority[(priorityIdx - 1)]?.types} />
          {Priority[(priorityIdx - 1)]?.title}
        </h1>
        { isOpenDD ? <UpArrowIcon /> : <DownArrowIcon /> }
      </div>
        {isOpenDD && (
          <div className="absolute bg-white">
            {Priority.map((obj: PriorityTypes, i: number) => (
                <button data-cy="modal-add-priority-item" key={i} onClick={() => handleChangeState(obj.id, obj.types)} className="border-[1px] w-[180px] flex items-center gap-5 py-[.60rem] px-3">
                  <PriorityColorRound types={obj.types} />
                  <p className="text-gray-600">{obj.title}</p>
              </button>
            ))}
          </div>
        )}
    </section>
  )
}

const UpArrowIcon: any = memo(function UpArrowIcon () {
  return (
    <img src={Up} alt="up-arrow" />
  )
})

const DownArrowIcon = memo(function DownArrowIcon () {
  return (
    <img src={Down} alt="down-arrow" />
  )
})
