import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
  isShow: boolean;
  clickOutside?: () => void;
};

export const Wrapper: React.FC<Props> = ({
  children,
  isShow,
  clickOutside,
}) => {
  if (!isShow) return null;

  return ReactDOM.createPortal(
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 flex justify-center'
    >
      <div className='absolute inset-0 bg-black/30' onClick={clickOutside} />
      {children}
    </div>,
    document.body
  );
};
