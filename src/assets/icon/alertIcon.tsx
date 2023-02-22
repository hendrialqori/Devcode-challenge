import Alert from '@/assets/svg/alert.svg';
import { memo } from 'react';

export const AlertIcon = memo(function AlertIcon() {
  return <img src={Alert} className='w-[75%]' alt='alert-icon' />;
});
