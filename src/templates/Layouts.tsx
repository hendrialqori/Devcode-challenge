import Headers from '../organisms/Headers'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <main className='font-Poppins'>
        <Headers />
        {children}
      </main>
    </div>
  )
}

export default Layout
