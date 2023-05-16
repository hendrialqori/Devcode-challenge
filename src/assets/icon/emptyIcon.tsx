import Empty from '@/assets/svg/empty.svg';
import { memo } from 'react';

export const EmptyIcon = memo(function EmptyIcon({
  clickHandlers,
}: {
  clickHandlers: () => void;
}) {
  return (
    <div data-cy='activity-empty-state' role='button'>
      <img
        src={Empty}
        className='w-[50%] pt-5 mx-auto cursor-pointer'
        alt='empty-man'
        onClick={clickHandlers}
      />
    </div>
  );
});
