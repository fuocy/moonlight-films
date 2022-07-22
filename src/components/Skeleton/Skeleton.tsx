import { FC, HTMLProps } from "react";

interface SkeletonProps {
  className: string;
}

const Skeleton: FC<HTMLProps<HTMLDivElement> | SkeletonProps> = ({
  className,
  ...others
}) => {
  return (
    <div
      className={`${className} animate-pulse bg-dark-lighten`}
      {...others}
    ></div>
  );
};

export default Skeleton;
