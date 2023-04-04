import { FunctionComponent, HTMLProps } from "react";

interface BlackBackdropProps {
  className?: string;
  children?: React.ReactNode;
}

const BlackBackdrop: FunctionComponent<
  BlackBackdropProps & HTMLProps<HTMLDivElement>
> = ({ className, children, ...others }) => {
  return (
    <div
      {...others}
      className={`fixed top-0 left-0 w-full h-full bg-black/60 z-[5] ${className}`}
    >
      {children}
    </div>
  );
};

export default BlackBackdrop;
