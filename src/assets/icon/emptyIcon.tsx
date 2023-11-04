import Empty from '@/assets/svg/empty.svg';

type Props = {
  onClick: () => void
}

export const EmptyIcon = ({ onClick }: Props) => {
  return (
    <button
      data-cy='activity-empty-state'
      onClick={onClick}
    >
      <img
        src={Empty}
        className='w-[50%] pt-5 mx-auto cursor-pointer'
        alt='empty-man'
      />
    </button>
  )
}
