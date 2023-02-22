import Older from '@/assets/svg/byOld.svg';
import { memo } from 'react';

export const OlderIcon = memo(function OlderIcon() {
  return <img src={Older} alt='older-icon' />;
});
