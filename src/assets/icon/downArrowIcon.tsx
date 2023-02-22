import Down from '@/assets/svg/down-arrow.svg';
import { memo } from 'react';

export const DownArrowIcon = memo(function DownArrowIcon() {
  return <img src={Down} alt='down-arrow' />;
});
