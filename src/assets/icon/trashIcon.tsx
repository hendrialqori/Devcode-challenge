import { memo } from 'react';
import Trash from '@/assets/svg/trash.svg';

export const TrashIcon = memo(function TrashIcon() {
  return <img src={Trash} alt='trash-icon' />;
});
