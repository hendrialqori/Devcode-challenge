import type { Activity } from '@/types';
import { ActivityItem } from './activity-item';
import { EmptyIcon } from '@/assets/icon/emptyIcon';

type Params = Pick<Activity, 'id' | 'title'>

type Props = {
  data: Activity[];
  onAddActivity: () => void
  onDeleteActivity: (params: Params) => void;
}

export const Activities = ({ data, onAddActivity, onDeleteActivity }: Props) => {

  if (data.length === 0) return (
    <div className='h-[calc(100vh_-_200px)] w-full flex justify-center items-center'>
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