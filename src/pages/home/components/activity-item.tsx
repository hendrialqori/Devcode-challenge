import { DateFormater } from '@/utils/dateFormater';
import { useNavigate } from 'react-router-dom';
import { ButtonDelete } from '@/components/button/deleteButton';
import type { Activity } from '@/types';


type Params = Pick<Activity, 'id' | 'title'>

type Props = Activity & {
  onDelete: (params: Params) => void
}

export const ActivityItem = ({ id, title, created_at, onDelete }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = (id: number) =>
    () => {
      navigate(`/detail/${id}`)
    }

  const handleDeleteActivity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onDelete({ id, title })
  }


  return (
    <li
      // onClick={handleNavigate(id)}
      className='flex flex-col justify-between rounded-md shadow-md aspect-square p-5 bg-white cursor-pointer'
      data-cy='activity-item'
      role='button'
      tabIndex={-1}
    >
      <h2
        className='font-bold text-lg'
        data-cy='activity-item-title'>
        {title}
      </h2>
      <div className='flex justify-between items-center'>
        <p
          className='text-sm font-semibold text-gray-400'
          data-cy='activity-item-date'
        >
          {DateFormater(new Date(created_at))}
        </p>
        <ButtonDelete
          onClick={handleDeleteActivity}
          data-cy='activity-item-delete-button'
        />
      </div>
    </li>
  );
};
