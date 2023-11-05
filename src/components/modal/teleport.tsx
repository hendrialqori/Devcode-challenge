import React from 'react'
import ReactDOM from 'react-dom';

type WrapperProps = {
  children: React.ReactNode;
  onClose: () => void
};

export const Wrapper = ({ children, onClose }: WrapperProps) => {
  return ReactDOM.createPortal(
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 flex justify-center items-center '
    >
      {children}
      <div className='fixed inset-0 bg-black/40 -z-10' onClick={onClose}/>
    </div>,
    document.body
  );
};


type TeleportProps = {
  show: boolean
  children: React.ReactNode,
  onClose: () => void
}

export const Teleport = ({ show, children, onClose }: TeleportProps) => {
  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'

    }
  }, [show])

  return (
    <>
      {
        show ? <Wrapper onClose={onClose}>{children}</Wrapper> : null
      }
    </>
  )

}
