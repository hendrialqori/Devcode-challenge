import { Fragment, memo, useState } from 'react'
import Newer from '../atoms/svg/byNew.svg'
import Older from '../atoms/svg/byOld.svg'
import CheckList from '../atoms/svg/checklist.svg'
import A_Z from '../atoms/svg/A-Z.svg'
import Z_A from '../atoms/svg/Z-A.svg'
import UnComplete from '../atoms/svg/unFinish.svg'
import { choosingTypeSortedFunc, toggleSorted } from '../context/actions'
import { useStoreContext } from '../context/store'

interface sort {
  id: number
  title: string
  icon: JSX.Element
  isChoose: boolean
}

const CheckListIcon = memo(function CheckListIcon () {
  return (
    <img src={CheckList} alt="checklist-icon" />
  )
})

export const NewerIcon = memo(function NewerIcon () {
  return (
  <img src={Newer} alt="newer-icon" />
  )
})

const OlderIcon = memo(function OlderIcon () {
  return (
    <img src={Older} alt="older-icon" />
  )
})

const FromAIcon = memo(function FromAIcon () {
  return (
    <img src={A_Z} alt="a_z-icon" />
  )
})

const FromZIcon = memo(function FromZIcon () {
  return (
    <img src={Z_A} alt="z_a-icon" />
  )
})

const UnCompleteIcon = memo(function UnCompleteIcon () {
  return (
    <img src={UnComplete} alt="uncomplete-icon" />
  )
})

const Sorted: sort[] = [
  {
    id: 1,
    title: 'Terbaru',
    icon: <NewerIcon />,
    isChoose: true
  },
  {
    id: 2,
    title: 'Terlama',
    icon: <OlderIcon />,
    isChoose: false
  },
  {
    id: 3,
    title: 'A-Z',
    icon: <FromAIcon />,
    isChoose: false
  },
  {
    id: 4,
    title: 'Z-A',
    icon: <FromZIcon />,
    isChoose: false
  },
  {
    id: 5,
    title: 'Belum selesai',
    icon: <UnCompleteIcon />,
    isChoose: false
  }
]

export default function SortedValue (): JSX.Element {
  const { state, dispatch } = useStoreContext()
  const [sorted, setSorted] = useState(Sorted)

  const handleChoosing = ({ id, title }: { id: number, title: string }): void => {
    setSorted(prev => prev.map((sort) => {
      return sort.id === id ? { id, title: sort.title, icon: sort.icon, isChoose: true } : { ...sort, isChoose: false }
    })
    )
    choosingTypeSortedFunc(dispatch, title)
    toggleSorted(dispatch)
  }

  return (
    <Fragment>
      {state.toggleSorted && (
        <section className='absolute bg-white top-[180px] border-y-[1px] border-gray-300 rounded-lg w-44'>
          {sorted.map((sort) => (
            <button data-cy="sort-selection" onClick={() => handleChoosing({ id: sort.id, title: sort.title })} key={sort.id} className='flex items-center justify-between p-3 border-x-[1px] border-b-[1px] border-gray-300 w-full'>
              <div className='flex items-center gap-2'>
                {sort.icon}
                <p className='text-sm'>{sort.title}</p>
              </div>
              {sort.isChoose && <CheckListIcon />}
            </button>
          ))}
        </section>
      )}
    </Fragment>
  )
}
