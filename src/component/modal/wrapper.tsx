type Props = {
  children: React.ReactNode;
  clickOutsideFunc: () => void;
};

export const Wrapper: React.FC<Props> = ({ children, clickOutsideFunc }) => {
  return (
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 bg-black/30 flex items-start justify-center'
      onClick={clickOutsideFunc}
    >
      {children}
    </div>
  );
};
