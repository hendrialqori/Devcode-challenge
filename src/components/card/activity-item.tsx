import { DateFormater } from '@/utils/dateFormater';
import { useNavigate } from 'react-router-dom';
import { ButtonDelete } from '../button/deleteButton';
import type { ActivityItem } from '@/types';

type Props = ActivityItem & {
  onDelete: (params: Pick<ActivityItem, 'id' | 'title'>) => void;
};

export const ActivityItemCard = (props: Props) => {

  const { id, title, created_at, onDelete } = props

  const navigate = useNavigate();

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()

  const handleDelete = () => {
    onDelete({ id, title })
  }

  return (
    <li
      onClick={() => navigate(`/detail/${id}`)}
      className='flex flex-col justify-between rounded-md shadow-md w-[205px] h-[200px] p-5 bg-white cursor-pointer'
      data-cy='activity-item'
    >
      <h2 className='font-bold text-lg' data-cy='activity-item-title'>
        {title}
      </h2>
      <div
        onClick={handleStopPropagation}
        className='flex justify-between  items-center'
      >
        <p
          className='text-sm font-semibold text-gray-400'
          data-cy='activity-item-date'
        >
          {DateFormater(new Date(created_at))}
        </p>
        <ButtonDelete
          onClick={handleDelete}
          data-cy='activity-item-delete-button'
        />
      </div>
    </li>
  );
};
