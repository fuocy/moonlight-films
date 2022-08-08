import { FunctionComponent, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface DeleteAccountProps {
  setIsShowPromptReAuthFor: any;
}

const DeleteAccount: FunctionComponent<DeleteAccountProps> = ({
  setIsShowPromptReAuthFor,
}) => {
  const [isShowPrompt, setIsShowPrompt] = useState(false);

  return (
    <>
      {isShowPrompt && (
        <>
          <div className="fixed top-[30%] md:left-[40%] left-[5%] right-[5%] md:w-[390px] z-50 bg-dark-lighten rounded-md min-h-[100px] shadow-md px-3 py-5">
            <div className="mx-auto mb-7 h-16 w-16 rounded-full border-[3px] border-red-500 tw-flex-center">
              <AiOutlineDelete size={40} className="text-red-500 " />
            </div>
            <p className="text-white text-xl text-center font-medium mb-4">
              You are about to delete this account
            </p>
            <p className="text-center mb-[2px]">
              This will remove your account and cannot recover
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
                onClick={() => {
                  setIsShowPromptReAuthFor("delete");
                  setIsShowPrompt(false);
                }}
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
      <div className="flex justify-center mt-12 mb-6">
        <button
          onClick={() => setIsShowPrompt(true)}
          className="px-5 py-2  border rounded-full text-red-500 border-dark-lighten-2 bg-dark-lighten hover:bg-red-500 hover:text-white transition duration-300"
        >
          Delete account
        </button>
      </div>
    </>
  );
};

export default DeleteAccount;
