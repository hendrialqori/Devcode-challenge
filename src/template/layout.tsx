import Headers from './header';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <main className='font-Poppins' id='root2'>
      <Headers />
      {children}
    </main>
  );
};

export default Layout;
