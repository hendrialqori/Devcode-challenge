import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
  isShow: boolean;
};

export const Wrapper: React.FC<Props> = ({
  children,
  isShow,
}) => {
  if (!isShow) return null;

  return ReactDOM.createPortal(
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 flex justify-center items-center bg-black/30'
    >
      {children}
    </div>,
    document.body
  );
};
