import { FC, HTMLProps } from "react";

interface SkeletonProps {
  className: string;
  children: React.ReactNode;
}

const Skeleton: FC<HTMLProps<HTMLDivElement> | SkeletonProps> = ({
  className,
  children,
  ...others
}) => {
  return (
    <div
      className={`${className} animate-pulse bg-dark-lighten rounded-md `}
      {...others}
    >
      {children}
    </div>
  );
};

export default Skeleton;
