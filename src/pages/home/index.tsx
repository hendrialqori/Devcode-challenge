import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useStoreContext } from '@/context/store';
import { openModalAlertDelete, deleteActivityItem } from '@/context/actions';

import Layout from '@/template/layout';
import { ButtonAdd } from '@/component/button/addButton';
import { ActivityItem } from '@/component/card/activityItem';
import { ModalSuccess } from '@/component/modal/sucessModal';
import { EmptyIcon } from '@/assets/icon/emptyIcon';
import { ModalDelete } from '@/component/modal/deleteModal';
import { Teleport } from '@/component/teleport';

import * as API from '@/middleware/index';

export default function Home() {
  const { data, isFetching } = useQuery({
    queryKey: ['getActivity'],
    queryFn: async () => await API.getActivity(),
    cacheTime: 12000,
  });

  const { state, dispatch } = useStoreContext();

  const [activeTeleport, setActiveTeleport] = useState(false);

  const queryClient = useQueryClient();

  const [isOpenModalDone, setOpenModalDone] = useState<boolean>(false);

  const handlePost = useMutation(API.postActivity, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['getActivity']);
    },
  });

  const handleDelete = useMutation(API.deleteActivity, {
    onSuccess: () => {
      openModalAlertDelete(dispatch);
      void queryClient.invalidateQueries(['getActivity']);
      setOpenModalDone(true);

      setTimeout(() => setOpenModalDone(false), 1500);
    },
  });

  const cencelDelete = (): void => {
    openModalAlertDelete(dispatch);
    deleteActivityItem(dispatch, {
      _id: 0,
      title: '',
    });
  };

  return (
    <>
      <Layout>
        <section className='container py-5'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold' data-cy='activity-title'>
              Activity
            </h1>
            <ButtonAdd
              clickHandlers={() => handlePost.mutate()}
              data_cy={'activity-add-button'}
            />
          </div>
          <div className='mt-14 flex flex-wrap gap-3 justify-center'>
            {isFetching ? (
              <p>Loading ....</p>
            ) : data?.data.length === 0 ? (
              <EmptyIcon clickHandlers={() => handlePost.mutate()} />
            ) : (
              data?.data?.map((obj, i) => <ActivityItem key={i} {...obj} />)
            )}
          </div>
        </section>
      </Layout>
      {/* Modal group */}
      <ModalDelete
        title={state.deleteActivityItem.title}
        text={'Apakah anda yakin menghapus activity'}
        deleteHandler={() =>
          handleDelete.mutate({ id: state.deleteActivityItem._id })
        }
        deleteCencel={() => cencelDelete()}
      />

      <ModalSuccess isOpen={isOpenModalDone} data_cy={'modal-information'} />
      {/* Modal group */}
    </>
  );
}
