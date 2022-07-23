import { FC, HTMLProps, useState } from "react";

interface ReadMoreProps {
  children: React.ReactNode;
}

const ReadMore: FC<ReadMoreProps | HTMLProps<HTMLSpanElement>> = ({
  children,
  ...others
}) => {
  const [isReadingMore, setIsReadingMore] = useState(false);

  const content = isReadingMore ? children : (children as string).slice(0, 250);

  return (
    <>
      <span {...others}>{content}</span>
      <button
        onClick={() => setIsReadingMore((prev) => !prev)}
        className="font-medium italic hover:brightness-75 transition duration-300"
      >
        {!isReadingMore && (children as string).length > 250 && "... See more"}
        {isReadingMore && <>&nbsp; Show less</>}
      </button>
    </>
  );
};

export default ReadMore;
