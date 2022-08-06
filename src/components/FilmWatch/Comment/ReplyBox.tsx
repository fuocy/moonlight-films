import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, FunctionComponent, useState } from "react";
import { MdSend } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { db } from "../../../shared/firebase";
import { User } from "../../../shared/types";
import { useAppSelector } from "../../../store/hooks";

interface ReplyBoxProps {
  commendId: string;
}

const ReplyBox: FunctionComponent<ReplyBoxProps> = ({ commendId }) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  const [commentInputValue, setCommentInputValue] = useState("");

  const [isSendingComment, setIsSendingComment] = useState(false);

  const commentSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!commentInputValue) return;

    setIsSendingComment(true);
    addDoc(collection(db, `replyTo-${commendId}`), {
      user: currentUser,
      value: commentInputValue.trim().slice(0, 500),
      reactions: {},
      createdAt: serverTimestamp(),
    }).finally(() => setIsSendingComment(false));

    setCommentInputValue("");
  };

  return (
    <form
      onSubmit={commentSubmitHandler}
      className="flex gap-4 items-center mt-4 relative z-20 mb-10 last:mb-0"
    >
      <LazyLoadImage
        src={(currentUser as User).photoURL as string}
        alt=""
        effect="opacity"
        className="w-11 h-11 rounded-full object-cover shrink-0"
        referrerPolicy="no-referrer"
      />
      <input
        value={commentInputValue}
        onChange={(e) => setCommentInputValue(e.target.value)}
        type="text"
        className="py-3 flex-1 bg-dark-lighten outline-none rounded-full px-4 text-white"
        placeholder="Write reply..."
      />
      {isSendingComment ? (
        <div className="w-10 h-10 rounded-full border-[3px] border-t-transparent border-primary animate-spin"></div>
      ) : (
        <button>
          <MdSend size={30} className="text-primary " />
        </button>
      )}
    </form>
  );
};

export default ReplyBox;
