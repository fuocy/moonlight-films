import { FunctionComponent } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
interface PaginationProps {
  currentPage: number;
  onChangePage: (page: number) => string;
  maxPage: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  onChangePage,
  maxPage,
}) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex gap-3 items-center">
        {currentPage > 1 && (
          <Link to={onChangePage(currentPage - 1)}>
            <MdArrowBackIos size={25} />
          </Link>
        )}

        {currentPage < 5 ? (
          <>
            {new Array(maxPage < 5 ? maxPage : 5).fill("").map((_, index) => (
              <Link
                key={index}
                to={onChangePage(index + 1)}
                className={`tw-pagination-btn ${
                  currentPage === index + 1 && "!bg-primary text-white"
                }`}
              >
                {index + 1}
              </Link>
            ))}
            {maxPage > 5 && (
              <>
                {maxPage > 6 && <span>...</span>}
                <Link
                  to={onChangePage(maxPage)}
                  className={`tw-pagination-btn ${
                    currentPage === maxPage && "!bg-primary text-white"
                  }`}
                >
                  {maxPage}
                </Link>
              </>
            )}
          </>
        ) : currentPage > maxPage - 4 ? (
          <>
            <Link
              to={onChangePage(1)}
              className={`tw-pagination-btn ${
                currentPage === 1 && "!bg-primary text-white"
              }`}
            >
              1
            </Link>
            <span>...</span>
            {[...new Array(5)].map((_, index) => (
              <Link
                key={index}
                to={onChangePage(maxPage - 4 + index)}
                className={`tw-pagination-btn ${
                  currentPage === maxPage - 4 + index &&
                  "!bg-primary text-white"
                }`}
              >
                {maxPage - 4 + index}
              </Link>
            ))}
          </>
        ) : (
          <>
            <Link
              to={onChangePage(1)}
              className={`tw-pagination-btn ${
                currentPage === 1 && "!bg-primary text-white"
              }`}
            >
              1
            </Link>
            <span>...</span>
            {new Array(5).fill("").map((_, index) => (
              <Link
                key={index}
                to={onChangePage(currentPage - 2 + index)}
                className={`tw-pagination-btn ${
                  currentPage === currentPage - 2 + index &&
                  "!bg-primary text-white"
                }`}
              >
                {currentPage - 2 + index}
              </Link>
            ))}
            <span>...</span>
            <Link
              to={onChangePage(maxPage)}
              className={`tw-pagination-btn ${
                currentPage === maxPage && "!bg-primary text-white"
              }`}
            >
              {maxPage}
            </Link>
          </>
        )}

        {currentPage < maxPage && (
          <Link to={onChangePage(currentPage + 1)}>
            <MdArrowForwardIos size={25} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
