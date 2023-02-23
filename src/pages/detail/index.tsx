import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/template/layout';
import { Todos } from './todos';
import { SortedTodos } from '@/component/sortedTodos';
import { toggleSorted, toggleModal } from '@/context/actions';
import { useStoreContext } from '@/context/store';
import { ModalForm } from '@/component/modal/formModal';
import { ButtonEdit } from '@/component/button/editButton';
import { ButtonAdd } from '@/component/button/addButton';
import { ButtonSorted } from '@/component/button/sortedButton';
import { ButtonBackHome } from '@/component/button/backHomeButton';

import * as API from '@/middleware';

const Detail: React.FC = () => {
  const { dispatch } = useStoreContext();

  const [title, setTitle] = useState<string>('');

  const [isEditTitle, setEditTitle] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.getTodosTitle(id);
        setTitle(res.title);
      } catch (error) {
        throw new Error('Something went wrong while hit API getTodoItitle');
      }
    })();
  }, []);

  const toggleSortedFunc = useCallback(
    () => toggleSorted(dispatch),
    [dispatch]
  );
  const toggleModalFunc = useCallback(() => toggleModal(dispatch), [dispatch]);

  const handleSubmit = async (): Promise<any> => {
    setEditTitle(false);
    try {
      await API.editTodoTitle({ id, title });
    } catch (error) {
      throw new Error('Error while submit form');
    }
  };
  return (
    <>
      <ModalForm />
      <Layout>
        <section onClick={() => setEditTitle(false)} className='container py-5'>
          <header className='flex justify-between items-center'>
            <div
              onClick={(e) => e.stopPropagation()}
              className='flex items-center gap-4'
            >
              <ButtonBackHome />
              {!isEditTitle ? (
                <h1
                  className='text-3xl font-bold'
                  onClick={() => setEditTitle(true)}
                  data-cy='todo-title'
                >
                  {title}
                </h1>
              ) : (
                <>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={async (e) => {
                      if (e.keyCode === 13) await handleSubmit();
                    }}
                    type='text'
                    className='border-b-[1px] border-gray-300 outline-none bg-transparent px-1 text-3xl font-bold'
                  />
                  <ButtonEdit clickHandlers={handleSubmit} types='large' />
                </>
              )}
              {isEditTitle || (
                <ButtonEdit
                  clickHandlers={() => setEditTitle(true)}
                  types='large'
                />
              )}
            </div>
            <div
              className='flex items-center gap-5'
              aria-label='button-wrapper'
            >
              <ButtonSorted clickHandlers={toggleSortedFunc} />

              <SortedTodos />
              {/* Sorted components will open when triggered from ButtonSorted */}

              <ButtonAdd
                clickHandlers={toggleModalFunc}
                data_cy={'todo-add-button'}
              />
            </div>
          </header>
          <section className='my-10'>
            <Todos />
          </section>
        </section>
      </Layout>
    </>
  );
};

export default Detail;
