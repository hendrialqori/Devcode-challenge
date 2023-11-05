import { NewerIcon } from '@/assets/icon/newerIcon';
import { OlderIcon } from '@/assets/icon/olderIcon';
import { FromAIcon } from '@/assets/icon/a_zIcon';
import { FromZIcon } from '@/assets/icon/z_aIcon';
import { UnCompleteIcon } from '@/assets/icon/uncompleteIcon';

interface sort {
  id: number;
  title: string;
  icon: JSX.Element;
  isChoose: boolean;
}

export const sortItem: sort[] = [
  {
    id: 1,
    title: 'Terbaru',
    icon: <NewerIcon />,
    isChoose: true,
  },
  {
    id: 2,
    title: 'Terlama',
    icon: <OlderIcon />,
    isChoose: false,
  },
  {
    id: 3,
    title: 'A-Z',
    icon: <FromAIcon />,
    isChoose: false,
  },
  {
    id: 4,
    title: 'Z-A',
    icon: <FromZIcon />,
    isChoose: false,
  },
  {
    id: 5,
    title: 'Belum selesai',
    icon: <UnCompleteIcon />,
    isChoose: false,
  },
];