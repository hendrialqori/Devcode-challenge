import { memo } from 'react'

interface PriorityColor {
  types: string
}

const PriorityColorRound = ({ types }: PriorityColor): JSX.Element => {
  let priorityColor
  switch (types) {
    case 'very-high':
      priorityColor = 'bg-rose-500'
      break
    case 'high':
      priorityColor = 'bg-yellow-500'
      break
    case 'normal':
      priorityColor = 'bg-green-500'
      break
    case 'low':
      priorityColor = 'bg-sky-500'
      break
    case 'very-low':
      priorityColor = 'bg-purple-500'
      break
    default:
      priorityColor = 'bg-rose-500'
  }
  return (
    <div className={`h-3 w-3 rounded-full ${priorityColor}`}></div>
  )
}

export default memo(PriorityColorRound)
