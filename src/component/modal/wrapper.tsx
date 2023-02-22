type Props = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 bg-black/30 flex items-start justify-center'
    >
      {children}
    </div>
  );
};
