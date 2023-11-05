import React from 'react';
import Layout from '@/template/layout';
import { ButtonAdd } from '@/components/button/addButton';
import { ModalSuccess } from '@/components/modal/modal-success';
import { ModalDelete } from '@/components/modal/modal-delete';
import { Activities } from './components/activities';
import * as API from '@/apis/services/activity'

const initialValueActivity = {
  id: null as number | null,
  title: ''
}

const initialValueModalDelete = {
  confirm: false,
  success: false
}

export default function Home() {

  const [activity, setActivity] = React.useState(initialValueActivity)

  const [modalDelete, setModalDelete] = React.useState(initialValueModalDelete)

  const { data: activities, status: activitiesStatus } = API.useGetActivities()

  const { mutate: createActivity, status: createActivityStatus } = API.useAddActivity()

  const { mutate: deleteActivity, status: deleteActivityStatus } = API.useDeleteActivity()

  const handleCreateActivity = () => {
    createActivity()
  }

  const handleModalDelete = (type: keyof typeof modalDelete | 'reset') => {
    switch (type) {
      case 'confirm':
        setModalDelete({ ...initialValueModalDelete, confirm: true })
        break
      case 'success':
        setModalDelete({ ...initialValueModalDelete, success: true })
        break
      case 'reset':
        setModalDelete(initialValueModalDelete)
        break
      default:
        return false
    }
  }

  const handleDeleteActivity = (params: typeof activity) => {
    setActivity(params)
    handleModalDelete('confirm')
  }

  const handleCencelDeleteActivity = () => {
    handleModalDelete('reset')
    setActivity(initialValueActivity)
  }

  const handleDeleteActionActivity = () => {
    deleteActivity({ id: activity.id as number }, {
      onSuccess: () => {
        handleModalDelete('success')
      }
    })
  }

  const handleCloseModalSuccess = React.useCallback(() => {
    handleModalDelete('reset')
  }, []);

  return (
    <>
      <Layout>
        <section className='container py-5'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold' data-cy='activity-title'>
              Activity
            </h1>
            <ButtonAdd
              onClick={handleCreateActivity}
              // isLoading={createActivityStatus === 'loading'}
              // disabled={createActivityStatus === 'loading'}
              data-cy='activity-add-button'
            />
          </div>
          <Activities
            isLoading={activitiesStatus === 'loading'}
            data={activities?.data ?? []}
            onAddActivity={handleCreateActivity}
            onDeleteActivity={handleDeleteActivity}
          />

        </section>
      </Layout>

      {/* Modal group */}
      <ModalDelete
        isShow={modalDelete.confirm}
        isLoading={deleteActivityStatus === 'loading'}
        text={'Apakah anda yakin menghapus activity'}
        title={activity.title}
        onDelete={handleDeleteActionActivity}
        onCencel={handleCencelDeleteActivity}
      />

      <ModalSuccess
        isShow={modalDelete.success}
        onClose={handleCloseModalSuccess}
      />
    </>
  );
}
