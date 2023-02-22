import { memo } from 'react';
import Arrow from '@/assets/svg/arrow.svg';

export const ArrowIcon = memo(function ArrowIcon() {
  return <img src={Arrow} alt='arrow-icon' />;
});
