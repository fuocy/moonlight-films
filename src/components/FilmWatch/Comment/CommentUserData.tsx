import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { FunctionComponent } from "react";
import Skeleton from "../../Common/Skeleton";
import CommentUserContent from "./CommentUserContent";
interface CommentUserDataProps {
  id?: number | string;
  media_type: string;
  commentLimit: number;
  isLoading: boolean;
  isError: boolean;
  commentData: QuerySnapshot<DocumentData> | null;
  sortType: string;
  role: string;
}

const CommentUserData: FunctionComponent<CommentUserDataProps> = ({
  id,
  media_type,
  commentLimit,
  isLoading,
  isError,
  commentData,
  sortType,
  role,
}) => {
  // console.log(
  //   convertReaction({
  //     "2": "sad",
  //     "10": "sad",
  //     "3": "haha",
  //     "4": "love",
  //     "5": "angry",
  //     "6": "angry",
  //     "7": "angry",
  //     "1": "haha",
  //     "8": "angry",
  //     "9": "haha",
  //   })
  // );

  return (
    <>
      {isError ? (
        <p className="text-red-500 text-lg text-center mb-6">
          ERROR: Loading comment failed. Your free service exceeded the
          limitation already.
        </p>
      ) : isLoading ? (
        <ul>
          {new Array(5).fill("").map((_, index) => (
            <li key={index} className="mb-6 flex gap-4 items-start">
              <Skeleton className="w-11 h-11 !rounded-full" />
              <div>
                <Skeleton className="h-[72px] w-[850px]" />
                <div className="flex gap-3 mt-3">
                  <Skeleton className="h-[20px] w-[50px]" />
                  <Skeleton className="h-[20px] w-[50px]" />
                  <Skeleton className="h-[20px] w-[50px]" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : commentData?.size === 0 && role === "comment" ? (
        <div className="text-white text-center text-lg">
          There are no comments yet.
        </div>
      ) : (
        <CommentUserContent
          commentData={commentData}
          commentLimit={commentLimit}
          media_type={media_type}
          sortType={sortType}
          id={id}
          role={role}
        />
      )}
    </>
  );
};

export default CommentUserData;
