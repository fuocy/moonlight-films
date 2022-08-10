import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation } from "react-router-dom";
import { useCollectionQuery } from "../../../hooks/useCollectionQuery";
import { db } from "../../../shared/firebase";
import { useAppSelector } from "../../../store/hooks";
import CommentUserData from "./CommentUserData";

interface CommentProps {
  id?: number;
  media_type: string;
}

const Comment: FunctionComponent<CommentProps> = ({ id, media_type }) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  const [commentInputValue, setCommentInputValue] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);
  const [commentLimit, setCommentLimit] = useState(5);
  const [sortType, setSortType] = useState("latest");

  const commentSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!commentInputValue) return;

    setIsSendingComment(true);
    addDoc(collection(db, `${media_type}-${id as number}`), {
      user: currentUser,
      value: commentInputValue.trim().slice(0, 500),
      reactions: {},
      createdAt: serverTimestamp(),
      isEdited: false,
    }).finally(() => setIsSendingComment(false));

    setCommentInputValue("");
  };

  const {
    data: commentData,
    isLoading,
    isError,
  } = useCollectionQuery(
    id,
    query(collection(db, `${media_type}-${id}`), orderBy("createdAt", "desc"))
  );

  // Auto comment
  useEffect(() => {
    if (!media_type || !id) return;
    getDocs(collection(db, `${media_type}-${id as number}`)).then(
      (docSnapshot) => {
        if (
          !docSnapshot.docs.some(
            (doc) => doc.data()?.user.uid === "CZGmXpePYsd1YryQR3C8xA5YOzb2"
          )
        ) {
          setDoc(doc(db, `${media_type}-${id as number}`, "admin"), {
            user: {
              displayName:
                "Anh có thể làm tính năng reaction nhưng sẽ không bao giờ được em react story",
              email: "huuphuoc@gmail.com",
              emailVerified: false,
              photoURL: "https://i.ibb.co/CJqGvY6/satthudatinh.jpg",
              uid: "CZGmXpePYsd1YryQR3C8xA5YOzb2",
            },
            value:
              "Ngoài bình luận, trang web còn có chức năng thả cảm xúc, xem thông tin những người thả cảm xúc, (cảm xúc được nhiều người thả sẽ được ưu tiên hiện đầu), trả lời bình luận, chỉnh sửa, xóa, ẩn bình luận, sắp xếp bình luận, tải thêm bình luận.",
            reactions: {
              "3RkuRS4zSqadAkKDqSfTjCzwzF92": "haha",
              GMaGmpy8ZaRBEhtaoZJdd9pNNXz1: "love",
              UNuwtFtu69YHDGTs2emT6O8ClSG3: "love",
              Z3eRARZ9jlftBLA6u0g8MWABkwo2: "like",
              nj99GDXzPwNhcfUpk5PkyNFiwPt1: "sad",
              ufw994VFRnQDCL0f6ISXpeIBTFX2: "haha",
              vOV472eiPwf1GT8YPjiXs4xfYxt1: "haha",
            },
            // reactions: {
            //   "6Lg5V78TSEWckhcLAh2DVwq5uBQ2": "haha",
            //   "7heoxozOe1W14I5sYUgAPr50Zj52": "love",
            //   DyXuUkhd9aTbJIeUn8Sgagoiv042: "love",
            //   PxxS9XDYd3RgU2Dgjq63MwdCvvn1: "angry",
            //   SUzdiwRMrNcRVJaKOJP3YH5hg7n1: "haha",
            //   aRoVaCH1MeakCx6Hnx6nRKmVwrt2: "haha",
            //   cn9xgPSUVlNzGasKyxoTTvFnVWk1: "wow",
            // },
            createdAt: Timestamp.fromDate(
              new Date("Sat Aug 03 2022 10:10:32 GMT+0700 (Indochina Time)")
            ),
            isEdited: true,
          });
        }
      }
    );
  }, [media_type, id]);

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-[140px]">
          <p className="md:text-2xl text-xl text-white font-medium">Comments</p>
          {commentData && commentData.size > 0 && (
            <p className="absolute md:-top-1 md:-right-1 -top-2 right-5 bg-dark-lighten w-6 h-6 text-sm rounded-full tw-flex-center">
              {commentData.size}
            </p>
          )}
        </div>
        <div className="flex">
          <button
            onClick={() => setSortType("latest")}
            className={`border border-dark-lighten px-2 py-1 rounded-l-xl transition duration-300   hover:text-white ${
              sortType === "latest" && "bg-dark-lighten-2 text-white"
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setSortType("popular")}
            className={`border border-dark-lighten px-2 py-1 rounded-r-xl transition duration-300   hover:text-white ${
              sortType === "popular" && "bg-dark-lighten-2 text-white"
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      <div className="md:px-4 px-1">
        <div className="mb-12">
          {!currentUser && (
            <p className="text-lg text-center">
              You need to
              <Link
                to={`/auth?redirect=${encodeURIComponent(location.pathname)}`}
                className="text-primary font-medium"
              >
                {" login "}
              </Link>
              to comment.
            </p>
          )}
          {currentUser && (
            <form
              onSubmit={commentSubmitHandler}
              className="flex gap-4 items-center"
            >
              <LazyLoadImage
                src={currentUser.photoURL as string}
                alt=""
                effect="opacity"
                className="w-12 h-12 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <input
                value={commentInputValue}
                onChange={(e) => setCommentInputValue(e.target.value)}
                type="text"
                className="py-3 flex-1 bg-dark-lighten outline-none rounded-full px-4 text-white"
                placeholder="Write comment..."
              />
              {isSendingComment ? (
                <div className="w-10 h-10 rounded-full border-[3px] border-t-transparent border-primary animate-spin"></div>
              ) : (
                <button>
                  <MdSend size={30} className="text-primary " />
                </button>
              )}
            </form>
          )}
        </div>

        <CommentUserData
          isLoading={isLoading}
          isError={isError}
          sortType={sortType}
          // @ts-ignore
          commentData={commentData}
          commentLimit={commentLimit}
          media_type={media_type}
          id={id}
          role="comment"
        />
      </div>

      {commentData && commentData.size > commentLimit && (
        <button
          className="font-medium"
          onClick={() => setCommentLimit((prev) => prev + 5)}
        >
          Load more comments ({commentLimit}/{commentData.size})
        </button>
      )}
    </div>
  );
};

export default Comment;

// useEffect(()=>{
//   onSnapshot(collection(db, `${media_type}-${id as number}`))
// },[])

// const isLoading = false;
// const isError = false;

// const commentData = {
//   size: 6,
//   docs: [
//     {
//       id: "1",

//       data: () => ({
//         user: {
//           displayName: "Pupc",

//           photoURL: "/me.jpg",
//         },
//         value: "phim hay quá xá quá đã quá xịn vip hehe",
//         reactions: {},
//         createdAt: { seconds: 5, nanoseconds: 5000000000 },
//       }),
//     },
//     {
//       id: "2",

//       data: () => ({
//         user: {
//           displayName: "Pupc",

//           photoURL: "/me.jpg",
//         },
//         value: "phim hay quá xá quá đã quá xịn vip hehe",
//         reactions: {},
//         createdAt: { seconds: 5, nanoseconds: 5000000000 },
//       }),
//     },
//     {
//       id: "3",

//       data: () => ({
//         user: {
//           displayName: "Pupc",

//           photoURL: "/me.jpg",
//         },
//         value: "phim hay quá xá quá đã quá xịn vip hehe",
//         reactions: {},
//         createdAt: { seconds: 5, nanoseconds: 5000000000 },
//       }),
//     },
//     {
//       id: "4",

//       data: () => ({
//         user: {
//           displayName: "Pupc",

//           photoURL: "/me.jpg",
//         },
//         value: "phim hay quá xá quá đã quá xịn vip hehe",
//         reactions: {
//           "10": "sad",
//           "3": "haha",
//           "2": "sad",
//           "4": "love",
//           "5": "love",
//         },
//         createdAt: { seconds: 5, nanoseconds: 5000000000 },
//       }),
//     },
//     {
//       id: "5",

//       data: () => ({
//         user: {
//           displayName: "Pupc",

//           photoURL: "/me.jpg",
//         },
//         value: "phim hay quá xá quá đã quá xịn vip hehe",
//         reactions: {},
//         createdAt: { seconds: 5, nanoseconds: 5000000000 },
//       }),
//     },
//     {
//       id: "6",

//       data: () => ({
//         user: {
//           displayName: "Pupc",

//           photoURL: "/me.jpg",
//         },
//         value: "phim hay quá xá quá đã quá xịn vip hehe",
//         reactions: {},
//         createdAt: { seconds: 5, nanoseconds: 5000000000 },
//       }),
//     },
//   ],
// };
