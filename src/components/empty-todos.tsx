import EmptyTodosIcon from '@/assets/svg/empty2.svg';

type Props = {
  onClick: () => void
}

export const EmptyTodos = ({ onClick }: Props) => {
  return (
    <img
      src={EmptyTodosIcon}
      className='w-[45%] pt-5 mx-auto cursor-pointer'
      alt='empty-girl'
      onClick={onClick}
      data-cy='todo-empty-state'
    />
  )
}