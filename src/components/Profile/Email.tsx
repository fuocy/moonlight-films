import { FunctionComponent } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { useAppSelector } from "../../store/hooks";
import { ToastContainer, toast } from "react-toastify";
interface EmailProps {
  setIsShowPromptReAuthFor: any;
  isUpdatingEmail: boolean;
  setIsUpdatingEmail: any;
  emailValueRef: any;
}

const Email: FunctionComponent<EmailProps> = ({
  setIsShowPromptReAuthFor,
  isUpdatingEmail,
  setIsUpdatingEmail,
  emailValueRef,
}) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <>
      <ToastContainer />
      <div>
        <p className="text-white text-lg">Email</p>

        {!isUpdatingEmail && (
          <div className="flex justify-between mt-1">
            <p>{currentUser?.email}</p>
            <button
              className="hover:text-primary transition duration-300"
              onClick={() => setIsUpdatingEmail(true)}
            >
              <AiOutlineEdit size={25} />
            </button>
          </div>
        )}

        {isUpdatingEmail && (
          <>
            <form
              // onSubmit={changeEmail}
              onSubmit={(e) => {
                e.preventDefault();
                if (!emailValueRef.current.value.trim().length) {
                  toast.error("You gotta type something", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  return;
                }
                setIsShowPromptReAuthFor("email");
              }}
              className="flex justify-between gap-48 mt-1"
            >
              <input
                type="email"
                ref={emailValueRef}
                defaultValue={currentUser?.email || ""}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsUpdatingEmail(false);
                }}
                className="outline-none bg-dark-lighten rounded-md py-1 px-2 w-full"
              />
              <button className="hover:text-primary transition duration-300">
                <BiSend size={25} />
              </button>
            </form>
            <p className="text-sm mt-1">Press Esc to cancel</p>
          </>
        )}
      </div>
    </>
  );
};

export default Email;
