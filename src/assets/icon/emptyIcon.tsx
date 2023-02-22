import Empty from '@/assets/svg/empty.svg';
import { memo } from 'react';

export const EmptyIcon = memo(function EmptyIcon({
  clickHandlers,
}: {
  clickHandlers: () => void;
}) {
  return (
    <img
      src={Empty}
      className='w-[50%] pt-5 mx-auto cursor-pointer'
      alt='empty-man'
      onClick={clickHandlers}
      data-cy='activity-empty-state'
    />
  );
});
