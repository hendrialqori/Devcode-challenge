import { TrashIcon } from '@/assets/icon/trashIcon';

type Props = React.ComponentProps<'button'>;

export const ButtonDelete: React.FC<Props> = ({ ...rest }) => {
  return (
    <button {...rest}>
      <TrashIcon />
    </button>
  );
};
