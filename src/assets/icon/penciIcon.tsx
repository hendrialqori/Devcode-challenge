import Pencil from '@/assets/svg/pencil.svg';
import { memo } from 'react';

interface ButtonEditProps {
  types: 'small' | 'large';
  clickHandlers?: () => void;
}

export const PencilIcon = memo(function PencilIcon({
  types,
}: ButtonEditProps): JSX.Element {
  let Size;
  switch (types) {
    case 'small':
      Size = 'w-4';
      break;
    case 'large':
      Size = 'w-5';
      break;
    default:
      Size = 'w-3';
  }
  return <img src={Pencil} className={Size} alt='pencil-icon' />;
});
