import { FormTitle } from './form-title';
import { SortAndAdd } from './sort-and-add';

export const Header = () => {
  return (
    <div className='flex justify-between items-center' aria-label='top-side'>
      <FormTitle />
      <SortAndAdd />
    </div>
  );
};
