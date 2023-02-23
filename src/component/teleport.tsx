import { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  clickOutside: () => void;
};

const teleportRef = document.querySelector('#root2');

export const Teleport: React.FC<Props> = ({
  children,
  isActive,
  clickOutside,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isActive) teleportRef?.appendChild(dialogRef.current as Node);
  }, [isActive]);

  const close = () => {
    teleportRef?.removeChild(teleportRef.childNodes[1]);
    clickOutside();
  };

  return (
    <>
      {isActive ? (
        <div
          ref={dialogRef}
          onClick={close}
          className='fixed flex inset-0 bg-black/20 justify-center'
        >
          {children}
        </div>
      ) : null}
    </>
  );
};
