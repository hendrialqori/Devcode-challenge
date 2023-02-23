import Headers from './header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <main className='font-Poppins' id='root2'>
      <Headers />
      {children}
    </main>
  );
};

export default Layout;
