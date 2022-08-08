import { deleteDoc } from "firebase/firestore";
import { FunctionComponent, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAppSelector } from "../../../store/hooks";
import { doc } from "firebase/firestore";
import { db } from "../../../shared/firebase";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AiOutlineDelete } from "react-icons/ai";
interface EditCommentProps {
  singleDoc: any;
  showOptionFor: string | undefined;
  setShowOptionFor: any;
  media_type: string;
  id?: number | string;
  setEditingCommentFor: any;
  setCommentHiden: any;
}

const EditComment: FunctionComponent<EditCommentProps> = ({
  singleDoc,
  showOptionFor,
  setShowOptionFor,
  media_type,
  id,
  setEditingCommentFor,
  setCommentHiden,
}) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isShowPrompt, setIsShowPrompt] = useState(false);
  const [show] = useAutoAnimate();
  return (
    <>
      <div className="relative z-[39]">
        <button
          onClick={() =>
            showOptionFor === singleDoc.id
              ? setShowOptionFor(undefined)
              : setShowOptionFor(singleDoc.id)
          }
          className="transition duration-300 mt-4 h-8 w-8 bg-transparent rounded-full tw-flex-center hover:bg-dark-lighten-2"
        >
          <BsThreeDots size={20} />
        </button>
        {showOptionFor === singleDoc.id && (
          <div className="absolute -left-8 w-[70px] flex flex-col gap-1 bg-dark-lighten-2 rounded-md px-3 py-2 shadow-md">
            {currentUser && currentUser.uid === singleDoc.data()?.user.uid && (
              <>
                <button
                  onClick={() => {
                    setEditingCommentFor(singleDoc.id);
                    setShowOptionFor(undefined);
                  }}
                  className="transition duration-300 hover:text-white text-left"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setIsShowPrompt(true);
                    setShowOptionFor(undefined);
                  }}
                  className="transition duration-300 hover:text-white text-left"
                >
                  Delete
                </button>
              </>
            )}
            {(!currentUser ||
              currentUser.uid !== singleDoc.data()?.user.uid) && (
              <button
                onClick={() =>
                  setCommentHiden((prev: string[]) => prev.concat(singleDoc.id))
                }
                className="transition duration-300 hover:text-white "
              >
                Hide
              </button>
            )}
          </div>
        )}
      </div>
      {showOptionFor === singleDoc.id && (
        <div
          onClick={() => setShowOptionFor(undefined)}
          className="fixed top-0 left-0 w-full h-full z-[35]"
        ></div>
      )}
      <div
        // @ts-ignore
        ref={show}
      >
        {isShowPrompt && (
          <>
            <div className="fixed top-[30%] md:left-[40%] md:right-auto left-[5%] right-[5%] md:w-[400px] z-50 bg-dark-lighten rounded-md min-h-[100px] shadow-md px-3 py-5">
              <div className="mx-auto mb-7 h-16 w-16 rounded-full border-[3px] border-red-500 tw-flex-center">
                <AiOutlineDelete size={40} className="text-red-500 " />
              </div>
              <p className="text-white text-xl text-center font-medium mb-4">
                You are about to remove this comment
              </p>
              <p className="text-center mb-[2px]">
                This will remove your films and cannot recover
              </p>
              <p className="text-center ">Are you sure?</p>
              <div className="flex mt-8 justify-end">
                <button
                  onClick={() => setIsShowPrompt(false)}
                  className="px-6 py-1 rounded-md text-white hover:brightness-75 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    deleteDoc(doc(db, `${media_type}-${id}`, singleDoc.id))
                  }
                  className="px-6 py-1 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-300"
                >
                  Yes
                </button>
              </div>
            </div>
            <div
              onClick={() => setIsShowPrompt(false)}
              className="fixed top-0 left-0 w-full h-full z-40 bg-black/60"
            ></div>
          </>
        )}
      </div>
    </>
  );
};

export default EditComment;
