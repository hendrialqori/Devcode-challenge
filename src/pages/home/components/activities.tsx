import { ActivityItem } from './activity-item';
import { EmptyIcon } from '@/assets/icon/emptyIcon';
import { useGetActivities } from '@/apis/services/activity';
import type { Activity } from '@/types';

type Params = Pick<Activity, 'id' | 'title'>

type Props = {
  onAddActivity: () => void
  onDeleteActivity: (params: Params) => void;
}

export const Activities = ({ onAddActivity, onDeleteActivity }: Props) => {

  const { data: activities, status: activitiesStatus } = useGetActivities()

  if (activities?.data.length === 0) return (
    <div className='h-[calc(100vh_-_200px)] w-full flex justify-center items-center'>
      <EmptyIcon
        onClick={onAddActivity}
      />
    </div>
  )

  return (
    <ul className='mt-14 grid grid-cols-4 gap-3'>
      {
        activities?.data.map((activity, i) => (
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