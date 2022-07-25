import { FC, HTMLProps, useState } from "react";

interface ReadMoreProps {
  children: React.ReactNode;
  className?: string;
  limitTextLength: number;
}

const ReadMore: FC<ReadMoreProps & HTMLProps<HTMLSpanElement>> = ({
  children,
  className = "",
  limitTextLength,
  ...others
}) => {
  const [isReadingMore, setIsReadingMore] = useState(false);

  const content = isReadingMore
    ? children
    : (children as string).slice(0, limitTextLength);

  return (
    <>
      <span {...others} className={`${className} inline-block`}>
        {content}

        <button
          onClick={() => setIsReadingMore((prev) => !prev)}
          className="font-medium italic hover:brightness-75 transition duration-300"
        >
          {!isReadingMore &&
            (children as string).length > limitTextLength &&
            "... See more"}
          {isReadingMore && <>&nbsp; Show less</>}
        </button>
      </span>
    </>
  );
};

export default ReadMore;
