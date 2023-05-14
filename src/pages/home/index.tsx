import { useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Layout from '@/template/layout';
import { ButtonAdd } from '@/component/button/addButton';
import { ActivityItemCard } from '@/component/card/activityItem';
import { ModalSuccess } from '@/component/modal/sucessModal';
import { EmptyIcon } from '@/assets/icon/emptyIcon';
import { ModalDelete } from '@/component/modal/deleteModal';

import * as API from '@/middleware/index';

import type { ActivityItem } from '@/types';

export default function Home() {
  const { data, status } = useQuery({
    queryKey: ['getActivity'],
    queryFn: async () => await API.getActivity(),
  });

  const queryClient = useQueryClient();

  const [deleteActivity, setDeleteActivity] = useState<
    Omit<ActivityItem, 'created_at'>
  >({
    id: 0,
    title: '',
  });

  const [isOpenModalDone, setOpenModalDone] = useState<boolean>(false);

  const handlePost = useMutation(API.postActivity, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['getActivity']);
    },
  });

  const { mutate: deleteActivityItem, isLoading: loadDelete } = useMutation(
    API.deleteActivity
  );

  const handleDelete = useCallback(() => {
    deleteActivityItem(
      { id: deleteActivity.id },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries(['getActivity']);

          // clear state deleteActivity
          setDeleteActivity({
            id: 0,
            title: '',
          });

          setOpenModalDone(true);
        },
      }
    );
  }, [deleteActivity]);

  const handleGetDataDelete = useCallback(
    (params: Omit<ActivityItem, 'created_at'>) => {
      setDeleteActivity(params);
    },
    []
  );

  const cencelDelete = useCallback((): void => {
    setDeleteActivity({
      id: 0,
      title: '',
    });
  }, []);

  const closeModalSuccess = useCallback(() => {
    setOpenModalDone(false);
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
              onClick={() => handlePost.mutate()}
              data-cy='activity-add-button'
            />
          </div>
          <ul className='mt-14 flex flex-wrap gap-3 justify-center'>
            {data?.data.length === 0 ? (
              <EmptyIcon clickHandlers={() => handlePost.mutate()} />
            ) : (
              data?.data?.map((obj, i) => (
                <ActivityItemCard
                  key={i}
                  {...obj}
                  actionDelete={handleGetDataDelete}
                />
              ))
            )}
          </ul>
        </section>
      </Layout>

      {/* Modal group */}
      <ModalDelete
        isOpen={!!deleteActivity.id && !!deleteActivity.title}
        text={'Apakah anda yakin menghapus activity'}
        title={deleteActivity.title}
        isLoading={loadDelete}
        deleteHandler={handleDelete}
        deleteCencel={cencelDelete}
      />

      <ModalSuccess isOpen={isOpenModalDone} clickOutside={closeModalSuccess} />
      {/* Modal group */}
    </>
  );
}
