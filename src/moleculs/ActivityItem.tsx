import ButtonDelete from '../atoms/ButtonDelete'
import { formatDate } from '../atoms/libs/FormatDate'
import { useStoreContext } from '../context/store'
import { openModalAlertDelete, deleteActivityItem } from '../context/actions'
import { useNavigate } from 'react-router-dom'

interface ActivityItemProps {
  id: number
  title: string
  created_at: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ActivityItem = ({ id, title, created_at }: ActivityItemProps): JSX.Element => {
  const { dispatch } = useStoreContext()
  const navigate = useNavigate()

  const handleDelete = (): void => {
    openModalAlertDelete(dispatch)
    deleteActivityItem(dispatch, {
      _id: id,
      title
    })
  }
  return (
     <section onClick={() => navigate(`/detail/${id}`)} className="flex flex-col justify-between rounded-md shadow-md w-[205px] h-[200px] p-5 bg-white cursor-pointer" data-cy="activity-item">
        <h2 className='font-bold text-lg' data-cy="activity-item-title">{title}</h2>
        <div onClick={e => e.stopPropagation()} className='flex justify-between  items-center'>
            <p className='text-sm font-semibold text-gray-400' data-cy="activity-item-date">{formatDate(new Date(created_at))}</p>
            <ButtonDelete clickHandlers={handleDelete} data_cy={'activity-item-delete-button'} />
        </div>
    </section>
  )
}

export default ActivityItem
