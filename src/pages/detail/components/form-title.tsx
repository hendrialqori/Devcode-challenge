import React from "react"
import { useParams, Link } from "react-router-dom"
import { useGetActivity, useUpdateActivity } from "@/apis/services/activity"
import { ArrowIcon } from "@/assets/icon/arrowIcon"
import { PencilIcon } from "@/assets/icon/penciIcon"
import { useClickOutside } from "@/hooks/use-clickoutside"

export const FormTitle = () => {

  const { id } = useParams()

  const { data: activity, status: activityStatus } = useGetActivity({ activity_id: Number(id) })

  const { mutate: updateActivity } = useUpdateActivity()

  const [title, setTitle] = React.useState('')

  const [isEditTitle, setIsEditTitle] = React.useState(false)


  React.useEffect(() => {
    if (activityStatus === 'success') {
      setTitle(activity?.title ?? '')
    }
  }, [activityStatus, activity])

  const handleIsEdit = (type: 'open' | 'close') => {
    if (type === 'open') return setIsEditTitle(true)
    if (type === 'close') return setIsEditTitle(false)
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSubmit = () => {
    if (isEditTitle) {
      updateActivity(
        {
          id: Number(id),
          title
        },
        {
          onSuccess: () => {
            handleIsEdit('close')
          }
        }
      )
    }
  }

  const handlePreventPropagtion =
    (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()

  return (
    <div
      onClick={handlePreventPropagtion}
      className='flex items-center gap-4'
    >
      <Link to='/' data-cy='todo-back-button'>
        <ArrowIcon />
      </Link>
      {
        isEditTitle
          ? <Form
            value={title}
            onChange={handleChangeTitle}
            onSubmit={handleSubmit}
          />
          : <Title
            value={title}
            onEdit={() => handleIsEdit('open')}
          />
      }
    </div>
  )
}

type TitleProps = {
  value: string
  onEdit: () => void
}

export const Title = ({ value, onEdit }: TitleProps) => {

  return (
    <div className='flex gap-3'>
      <h2
        className='text-3xl font-bold'
        onClick={onEdit}
        data-cy='todo-title'
        role="button"
        tabIndex={-1}
      >
        {value}
      </h2>
      <button
        onClick={onEdit}
        data-cy='todo-title-edit-button'
      >
        <PencilIcon types='large' />
      </button>
    </div >
  )

}

type FormProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void
}

export const Form = (props: FormProps) => {

  const { value, onChange, onSubmit } = props

  const formRef = React.useRef<HTMLFormElement | null>(null)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onSubmit()
  }

  // submit when click outside form element

  useClickOutside(formRef, onSubmit)

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <input
        value={value}
        onChange={onChange}
        type='text'
        className='relative border-b-[1px] border-gray-300 outline-none bg-transparent px-1 text-3xl font-bold'
        autoFocus
        required
      />
      <button type='submit'>
        <PencilIcon types='large' />
      </button>
    </form>
  )
}