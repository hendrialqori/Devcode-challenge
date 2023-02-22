import { TrashIcon } from '@/assets/icon/trashIcon';

interface IButtonDeleteProps {
  clickHandlers?: () => void;
  data_cy: string;
}

export const ButtonDelete = ({
  clickHandlers,
  data_cy,
}: IButtonDeleteProps) => {
  return (
    <button onClick={clickHandlers} data-cy={data_cy}>
      <TrashIcon />
    </button>
  );
};
