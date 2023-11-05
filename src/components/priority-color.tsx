import { memo } from 'react';

interface PriorityColor {
  type: string;
}

export const PriorityColor = memo(
  ({ type }: PriorityColor): JSX.Element => {
    let priorityColor;

    switch (type) {
      case 'very-high':
        priorityColor = 'bg-rose-500';
        break;
      case 'high':
        priorityColor = 'bg-yellow-500';
        break;
      case 'normal':
        priorityColor = 'bg-green-500';
        break;
      case 'low':
        priorityColor = 'bg-sky-500';
        break;
      case 'very-low':
        priorityColor = 'bg-purple-500';
        break;
      default:
        priorityColor = 'bg-rose-500';
    }
    return <div className={`h-3 w-3 rounded-full ${priorityColor}`}></div>;
  }
);
