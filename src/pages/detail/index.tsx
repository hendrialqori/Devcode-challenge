import { useCallback, useState } from 'react';
import Layout from '@/template/layout';
import { Todos } from './todos';
import { ModalForm } from '@/components/modal/formModal';
import { Header } from './header';
import type { Todo } from '@/types';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as API from '@/middleware';

type FormMode = 'create' | 'update';

const Detail: React.FC = () => {
  const [modeForm, setModeForm] = useState<FormMode>('create');

  const [isOpenForm, setOpenForm] = useState(false);

  const [isEditTitle, setEditTitle] = useState(false);

  const [dataForm, setDataForm] = useState<
    Pick<Todo, 'id' | 'title' | 'priority'>
  >({
    id: 0,
    title: '',
    priority: 'very-high',
  });

  const toggleForm = useCallback(() => {
    setOpenForm((prev) => !prev);
    setDataForm({
      id: 0,
      title: '',
      priority: 'very-high',
    });
  }, []);

  const showFormTodo = useCallback(
    (mode: FormMode) => {
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

  const { id } = useParams();

  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');

  const {} = useQuery({
    queryKey: ['detail-title'],
    queryFn: async () => await API.getTodosTitle(id),
    onSuccess: (data) => {
      setTitle(data.title);
    },
  });

  const { mutate: updateDetailTitle } = useMutation(API.editTodoTitle);

  const updateDetailTitleAction = () => {
    updateDetailTitle(
      {
        id,
        title,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['detail-title']);
        },
      }
    );
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    updateDetailTitleAction();
    setEditTitle(false);
  };

  const updateDetailTitleClickOutside = () => {
    if (isEditTitle) {
      updateDetailTitleAction();
      queryClient.invalidateQueries(['getActivity']);
      setEditTitle(false);
      return;
    }

    setEditTitle(false);
  };

  return (
    <div className='min-h-screen' onClick={updateDetailTitleClickOutside}>
      <ModalForm
        ishow={isOpenForm}
        mode={modeForm}
        toggleForm={toggleForm}
        dataForm={dataForm}
        setDataForm={setDataForm}
      />

      <Layout>
        <section className='container py-5'>
          <Header
            title={title}
            isEditTitle={isEditTitle}
            updateTitleAction={handleSubmit}
            setTitle={setTitle}
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
