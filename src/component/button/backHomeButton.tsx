import { ArrowIcon } from '@/assets/icon/arrowIcon';
import { Link } from 'react-router-dom';

export const ButtonBackHome = (): JSX.Element => {
  return (
    <Link to='/' data-cy='todo-back-button'>
      <ArrowIcon />
    </Link>
  );
};
