import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { useCollectionQuery } from "../../../hooks/useCollectionQuery";
import { db } from "../../../shared/firebase";
import CommentUserData from "./CommentUserData";

interface ReplyProps {
  commendId: string;
}

const Reply: FunctionComponent<ReplyProps> = ({ commendId }) => {
  const [commentLimit, setCommentLimit] = useState(5);

  const {
    data: commentData,
    isLoading,
    isError,
  } = useCollectionQuery(
    commendId,
    query(collection(db, `replyTo-${commendId}`), orderBy("createdAt", "desc"))
  );

  // Auto comment
  useEffect(() => {
    getDocs(collection(db, "replyTo-admin")).then((docSnapshot) => {
      if (
        !docSnapshot.docs.some(
          (doc) => doc.data()?.user.uid === "Z3eRARZ9jlftBLA6u0g8MWABkwo2"
        )
      ) {
        addDoc(collection(db, "replyTo-admin"), {
          user: {
            displayName: "Vì anh  đâu có biết",
            email: "huuphuoc5@gmail.com",
            emailVerified: false,
            photoURL: "https://i.ibb.co/zrXfKsJ/catface-7.jpg",
            uid: "Z3eRARZ9jlftBLA6u0g8MWABkwo2",
          },
          value: "ghê vậy shao",
          reactions: {
            CZGmXpePYsd1YryQR3C8xA5YOzb2: "angry",
            GMaGmpy8ZaRBEhtaoZJdd9pNNXz1: "haha",
            UNuwtFtu69YHDGTs2emT6O8ClSG3: "haha",
          },
          // reactions: {
          //   "6Lg5V78TSEWckhcLAh2DVwq5uBQ2": "haha",
          //   "7heoxozOe1W14I5sYUgAPr50Zj52": "love",
          //   DyXuUkhd9aTbJIeUn8Sgagoiv042: "love",
          // },
          createdAt: Timestamp.fromDate(
            new Date("Sat Aug 06 2022 10:10:32 GMT+0700 (Indochina Time)")
          ),
          isEdited: false,
        });
      }
    });
  }, []);

  return (
    <>
      {commentData && commentData.size > 0 && (
        <div className="mt-5">
          <CommentUserData
            role="reply"
            isLoading={isLoading}
            isError={isError}
            sortType="latest"
            // @ts-ignore
            commentData={commentData}
            commentLimit={commentLimit}
            media_type="replyTo"
            id={commendId}
          />
        </div>
      )}
      {commentData && commentData.size > commentLimit && (
        <button
          className="font-medium mt-3"
          onClick={() => setCommentLimit((prev) => prev + 5)}
        >
          Load more replies ({commentLimit}/{commentData.size})
        </button>
      )}
    </>
  );
};

export default Reply;
