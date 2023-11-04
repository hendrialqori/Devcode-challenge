import type { Activity } from '@/types';
import { ActivityItem } from './activity-item';
import { EmptyIcon } from '@/assets/icon/emptyIcon';

type Params = Pick<Activity, 'id' | 'title'>

type Props = {
  isLoading: boolean;
  data: Activity[];
  onAddActivity: () => void
  onDeleteActivity: (params: Params) => void;
}

export const Activities = ({ isLoading, data, onAddActivity, onDeleteActivity }: Props) => {

  if (isLoading) return (
    <div className='h-screen bg-gray-100' />
  )

  if (data.length === 0) return (
    <div className='h-full w-full flex justify-center items-start'>
      <EmptyIcon
        onClick={onAddActivity
        } />
    </div>
  )

  return (
    <ul className='mt-14 grid grid-cols-4 gap-3'>
      {
        data.map((activity, i) => (
          <ActivityItem
            key={i}
            {...activity}
            onDelete={onDeleteActivity}
          />
        ))
      }
    </ul>
  )
}