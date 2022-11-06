import Layout from '../templates/Layouts'
import { ButtonAdd } from '../atoms/ButtonAdd'
import ActivityItem from '../moleculs/ActivityItem'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import ModalAlertDelete from '../organisms/ModalAlertDelete'
import { useStoreContext } from '../context/store'
import { openModalAlertDelete, deleteActivityItem } from '../context/actions'
import { useState, memo } from 'react'
import ModalDone from '../atoms/ModalAlertDone'
import Empty from '../atoms/svg/empty.svg'

interface ActivityItemProps {
  id: number
  title: string
  created_at: string
}

const getActivity = async (): Promise<any> => {
  const URL = 'https://todo.api.devcode.gethired.id/activity-groups?email=teamhendri18@gmail.com'
  const request = await fetch(URL)

  if (!request.ok) {
    throw new Error('Failed to fetch data from server')
  }
  return await request.json()
}

const postActivity = async (): Promise<any> => {
  const URL = 'https://todo.api.devcode.gethired.id/activity-groups'
  const request = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: 'teamhendri18@gmail.com',
      title: 'New Activity'
    })
  })

  if (!request.ok) {
    throw new Error('Failed to fetch data from server')
  }
  return await request.json()
}

const deleteActivity = async ({ id }: { id: number }): Promise<any> => {
  const URL = `https://todo.api.devcode.gethired.id/activity-groups/${id}`
  const request = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })

  if (!request.ok) {
    throw new Error('Failed to fetch data from server')
  }
  return await request.json()
}

const Home = (): JSX.Element => {
  const { data, isLoading } = useQuery('activity', getActivity)
  const { state, dispatch } = useStoreContext()
  const queryClient = useQueryClient()

  const [isOpenModalDone, setOpenModalDone] = useState<boolean>(false)

  const handlePost = useMutation(postActivity, {
    onSuccess: () => {
      void queryClient.invalidateQueries()
    }
  })

  const handleDelete = useMutation(deleteActivity, {
    onSuccess: () => {
      openModalAlertDelete(dispatch)
      void queryClient.invalidateQueries()
      setOpenModalDone(true)

      setTimeout(() => setOpenModalDone(false), 1500)
    }
  })

  const cencelDelete = (): void => {
    openModalAlertDelete(dispatch)
    deleteActivityItem(dispatch, {
      _id: 0,
      title: ''
    })
  }

  return (
    <Layout>
        <section className='container py-5'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold' data-cy="activity-title">Activity</h1>
            <ButtonAdd clickHandlers={() => handlePost.mutate()} data_cy={'activity-add-button'} />
          </div>
          <div className='mt-14 flex flex-wrap gap-3 justify-center'>
            {isLoading
              ? <progress className="du-progress w-56"></progress>
              : data?.data.length === 0
                ? <EmptyIcon clickHandlers={() => handlePost.mutate()} />
                : data?.data?.map((obj: ActivityItemProps, i: number) => (
              <ActivityItem
                key={i}
                {...obj}
              />
                ))}
              <ModalAlertDelete
                title={state.deleteActivityItem.title}
                text={'Apakah anda yakin menghapus activity'}
                deleteHandler={() => handleDelete.mutate({ id: state.deleteActivityItem._id })}
                deleteCencel={() => cencelDelete()}
              />

              <ModalDone isOpen={isOpenModalDone} data_cy={'modal-information'} />
          </div>
        </section>
    </Layout>
  )
}

const EmptyIcon = memo(function EmptyIcon ({ clickHandlers }: { clickHandlers: () => void }) {
  return (
    <img src={Empty} className="w-[50%] pt-5 mx-auto cursor-pointer" alt="empty-man" onClick={clickHandlers} data-cy="activity-empty-state" />
  )
})

export default Home
