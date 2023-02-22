import { PencilIcon } from '@/assets/icon/penciIcon';
import { useStoreContext } from '@/context/store';

interface ButtonEditProps {
  types: 'small' | 'large';
  clickHandlers?: () => void;
}
export const ButtonEdit = ({
  types,
  clickHandlers,
}: ButtonEditProps): JSX.Element => {
  const { state } = useStoreContext();
  return (
    <button onClick={clickHandlers} disabled={state?.toggleSorted}>
      <PencilIcon types={types} />
    </button>
  );
};
