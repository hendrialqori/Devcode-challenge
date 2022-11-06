import { memo } from 'react'
import Arrow from '../atoms/svg/arrow.svg'
import { Link } from 'react-router-dom'

const ButtonBackHome = (): JSX.Element => {
  return (
    <Link to='/' data-cy="todo-back-button">
        <ArrowIcon />
    </Link>
  )
}

const ArrowIcon = memo(function ArrowIcon () {
  return (
        <img src={Arrow} alt="arrow-icon" />
  )
})

export default ButtonBackHome
