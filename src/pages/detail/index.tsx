import { useCallback, useState } from 'react';
import Layout from '@/template/layout';
import { Todos } from './todos';
import { ModalForm } from '@/component/modal/formModal';
import { Header } from './header';

import type { Todo } from '@/types';

const Detail: React.FC = () => {
  const [modeForm, setModeForm] = useState<'create' | 'update'>('create');

  const [isOpenForm, setOpenForm] = useState(false);

  const [isEditTitle, setEditTitle] = useState(false);

  const [dataForm, setDataForm] = useState<
    Pick<Todo, 'id' | 'title' | 'priority'>
  >({
    id: 0,
    title: '',
    priority: 'very-high',
  });

  const showFormTodo = useCallback(
    (mode: 'create' | 'update') => {
      if (mode === 'create') {
        setModeForm('create');
        toggleForm();
        return;
      }
      if (mode === 'update') {
        setModeForm('update');
        setOpenForm((prev) => !prev);
        return;
      }
    },
    [modeForm]
  );

  const toggleForm = useCallback(() => {
    setOpenForm((prev) => !prev);
    setDataForm({
      id: 0,
      title: '',
      priority: 'very-high',
    });
  }, []);

  return (
    <div className='min-h-screen' onClick={() => setEditTitle(false)}>
      <ModalForm
        ishow={isOpenForm}
        mode={modeForm}
        toggle={toggleForm}
        dataForm={dataForm}
        setDataForm={setDataForm}
      />

      <Layout>
        <section className='container py-5'>
          <Header
            isEditTitle={isEditTitle}
            setEditTitle={setEditTitle}
            createTodo={() => showFormTodo('create')}
          />

          {/* Todo list */}
          <Todos
            createTodo={() => showFormTodo('create')}
            setDataForm={setDataForm}
            updateTodo={() => showFormTodo('update')}
          />
          {/* Todo list */}
        </section>
      </Layout>
    </div>
  );
};

export default Detail;
