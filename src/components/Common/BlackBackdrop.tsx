import { FunctionComponent, HTMLProps } from "react";

interface BlackBackdropProps {
  className?: string;
  children?: React.ReactNode;
  onCloseBlackBackdrop?: () => void;
}

const BlackBackdrop: FunctionComponent<
  BlackBackdropProps & HTMLProps<HTMLDivElement>
> = ({ className, children, onCloseBlackBackdrop, ...others }) => {
  return (
    <div
      {...others}
      onClick={onCloseBlackBackdrop}
      className={`fixed top-0 left-0 w-full h-full bg-black/60 z-[5] ${className}`}
    >
      {children}
    </div>
  );
};

export default BlackBackdrop;
