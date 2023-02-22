import { memo } from 'react';
import Sort from '../svg/sort.svg';

export const SortIcon = memo(function SortIcon() {
  return <img src={Sort} alt='sort-icon' width={45} />;
});
