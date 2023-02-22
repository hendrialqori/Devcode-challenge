import { memo } from 'react';
import Done from '@/assets/svg/done-circle.svg';

export const DoneIcon = memo(function DoneIcon() {
  return <img src={Done} alt='done-icon' />;
});
