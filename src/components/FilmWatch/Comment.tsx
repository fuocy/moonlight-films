import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface CommentProps {}

const Comment: FunctionComponent<CommentProps> = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-[140px]">
          <p className="text-2xl text-white font-medium">Comments</p>
          <p className="absolute -top-1 -right-1 bg-dark-lighten w-6 h-6 text-sm rounded-full tw-flex-center">
            12
          </p>
        </div>
        <div className="flex">
          <button className="border border-dark-lighten px-2 py-1 rounded-l-xl">
            Latest
          </button>
          <button className="border border-dark-lighten px-2 py-1 rounded-r-xl">
            Popular
          </button>
        </div>
      </div>

      <div>
        {!currentUser && (
          <p>
            You need to
            <Link
              to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`}
              className="text-primary font-medium"
            >
              login
            </Link>
            to comment
          </p>
        )}
        {currentUser && (
          <div className="p-4 border-dark-lighten-2 border-2 focus-within:border-primary focus-within:shadow-sm focus-within:shadow-primary rounded-lg">
            <textarea
              style={{ resize: "none" }}
              className="w-full outline-none bg-transparent border-b border-b-dark-lighten-2 "
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
