import CheckList from '@/assets/svg/checklist.svg';
import { memo } from 'react';

export const CheckListIcon = memo(function CheckListIcon() {
  return <img src={CheckList} alt='checklist-icon' />;
});
