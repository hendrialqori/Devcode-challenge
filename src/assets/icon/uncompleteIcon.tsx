import UnComplete from '@/assets/svg/unFinish.svg';
import { memo } from 'react';

export const UnCompleteIcon = memo(function UnCompleteIcon() {
  return <img src={UnComplete} alt='uncomplete-icon' />;
});
