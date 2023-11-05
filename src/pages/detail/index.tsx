import Layout from '@/template/layout';
import { Todos } from './components/todos';
import { Header } from './components/header';

const Detail: React.FC = () => {
  return (
    <Layout>
      <section className='container py-5'>
        <Header />
        <Todos />
      </section>
    </Layout>

  );
};

export default Detail;
