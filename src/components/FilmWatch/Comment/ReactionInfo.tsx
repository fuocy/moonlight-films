import { FunctionComponent, useState } from "react";
import { AiFillHeart, AiTwotoneLike } from "react-icons/ai";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { FaAngry, FaSadTear, FaSurprise } from "react-icons/fa";
import UserWhoReact from "./UserWhoReact";

interface ReactionInfoProps {
  docData: any;
}

const ReactionInfo: FunctionComponent<ReactionInfoProps> = ({ docData }) => {
  const [isShowReactionData, setIsShowReactionData] = useState(false);

  const convertReaction = (reactions: { [key: string]: string }) => {
    const countNumberOfEachReaction = Object.values(reactions).reduce(
      (acc, current) => {
        acc[current] = 1 + (acc[current] || 0);

        return acc;
      },
      {} as { [key: string]: number }
    );

    const sortedByNumberOfReaction = Object.entries(
      countNumberOfEachReaction
    ).sort((a, b) => b[1] - a[1]);

    return sortedByNumberOfReaction;
  };

  return (
    <>
      {Object.values(docData.reactions).length > 0 && (
        <>
          <UserWhoReact
            docData={docData}
            isShowReactionData={isShowReactionData}
            setIsShowReactionData={setIsShowReactionData}
          />
          <button
            onClick={() => setIsShowReactionData(true)}
            className="absolute flex gap-1 items-center -right-10 -bottom-3  bg-dark-lighten-2 px-1 pl-3 py-[2px] rounded-full shadow-md peer hover:brightness-75 transition duration-300"
          >
            {convertReaction(docData.reactions)
              .slice(0, 3)
              .map((reactionEntry: any, index: number) => (
                <div key={index}>
                  {reactionEntry[0] === "like" && (
                    <AiTwotoneLike
                      className={`relative text-blue-500 -ml-2 ${
                        index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                      }`}
                      size={20}
                    />
                  )}
                  {reactionEntry[0] === "love" && (
                    <AiFillHeart
                      className={`relative text-red-500 -ml-2 ${
                        index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                      }`}
                      size={20}
                    />
                  )}
                  {reactionEntry[0] === "haha" && (
                    <BsEmojiLaughingFill
                      className={`relative text-yellow-500 -ml-2 ${
                        index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                      }`}
                      size={20}
                    />
                  )}
                  {reactionEntry[0] === "wow" && (
                    <FaSurprise
                      className={`relative text-green-500 -ml-2 ${
                        index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                      }`}
                      size={20}
                    />
                  )}
                  {reactionEntry[0] === "sad" && (
                    <FaSadTear
                      className={`relative text-purple-500 -ml-2 ${
                        index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                      }`}
                      size={20}
                    />
                  )}
                  {reactionEntry[0] === "angry" && (
                    <FaAngry
                      className={`relative text-orange-500 -ml-2 ${
                        index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                      }`}
                      size={20}
                    />
                  )}
                </div>
              ))}
            <p className="text-sm">{Object.values(docData.reactions).length}</p>
          </button>
          <ul className="flex flex-col gap-2 peer-hover:opacity-100 peer-hover:visible opacity-0 invisible transition duration-300 absolute -right-24 top-[90px] bg-dark-lighten-2/60 px-3 py-2 rounded-md shadow-md z-10">
            {convertReaction(docData.reactions).map(
              (reactionEntry: any, index: number) => (
                <li key={index}>
                  {reactionEntry[0] === "like" && (
                    <div className="flex gap-2">
                      <AiTwotoneLike
                        className={`relative text-blue-500 -ml-1 ${
                          index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                        }`}
                        size={20}
                      />
                      <p>{reactionEntry[1]}</p>
                    </div>
                  )}
                  {reactionEntry[0] === "love" && (
                    <div className="flex gap-2">
                      <AiFillHeart
                        className={`relative text-red-500 -ml-1 ${
                          index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                        }`}
                        size={20}
                      />
                      <p>{reactionEntry[1]}</p>
                    </div>
                  )}
                  {reactionEntry[0] === "haha" && (
                    <div className="flex gap-2">
                      <BsEmojiLaughingFill
                        className={`relative text-yellow-500 -ml-1 ${
                          index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                        }`}
                        size={20}
                      />
                      <p>{reactionEntry[1]}</p>
                    </div>
                  )}
                  {reactionEntry[0] === "wow" && (
                    <div className="flex gap-2">
                      <FaSurprise
                        className={`relative text-green-500 -ml-1 ${
                          index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                        }`}
                        size={20}
                      />
                      <p>{reactionEntry[1]}</p>
                    </div>
                  )}
                  {reactionEntry[0] === "sad" && (
                    <div className="flex gap-2">
                      <FaSadTear
                        className={`relative text-purple-500 -ml-1 ${
                          index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                        }`}
                        size={20}
                      />
                      <p>{reactionEntry[1]}</p>
                    </div>
                  )}
                  {reactionEntry[0] === "angry" && (
                    <div className="flex gap-2">
                      <FaAngry
                        className={`relative text-orange-500 -ml-1 ${
                          index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
                        }`}
                        size={20}
                      />
                      <p>{reactionEntry[1]}</p>
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
        </>
      )}{" "}
    </>
  );
};

export default ReactionInfo;
