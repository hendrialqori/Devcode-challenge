import { memo } from 'react';
import Plus from '@/assets/svg/plusIcon.svg';

export const PlusIcon = memo(function PlusIcon() {
  return <img src={Plus} alt='plus-icon' />;
});
