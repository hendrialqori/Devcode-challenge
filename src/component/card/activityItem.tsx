import { DateFormater } from '@/utils/dateFormater';
import { useNavigate } from 'react-router-dom';
import { ButtonDelete } from '../button/deleteButton';
import type { ActivityItem } from '@/types';

type Props = ActivityItem & {
  actionDelete: (params: Pick<ActivityItem, 'id' | 'title'>) => void;
};

export const ActivityItemCard = ({
  id,
  title,
  created_at,
  actionDelete,
}: Props): JSX.Element => {
  const navigate = useNavigate();

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
        onClick={(e) => e.stopPropagation()}
        className='flex justify-between  items-center'
      >
        <p
          className='text-sm font-semibold text-gray-400'
          data-cy='activity-item-date'
        >
          {DateFormater(new Date(created_at))}
        </p>
        <ButtonDelete
          onClick={() => {
            actionDelete({ id, title });
          }}
          data-cy='activity-item-delete-button'
        />
      </div>
    </li>
  );
};
