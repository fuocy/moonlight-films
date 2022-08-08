import { FunctionComponent } from "react";
import { ToastContainer, toast } from "react-toastify";
interface PasswordProps {
  setIsShowPromptReAuthFor: any;
  isUpdatedPassword: boolean;
  setIsUpdatedPassword: any;
  newPasswordValueRef: any;
}

const Password: FunctionComponent<PasswordProps> = ({
  setIsShowPromptReAuthFor,
  isUpdatedPassword,
  setIsUpdatedPassword,
  newPasswordValueRef,
}) => {
  return (
    <>
      <ToastContainer />

      {isUpdatedPassword && (
        <>
          <div className="px-5 py-3 rounded-md z-10 bg-dark-lighten-2 md:w-[350px] fixed top-[35%] md:left-[35%] left-[5%] right-[5%] min-h-[100px]">
            <p className="text-white text-lg text-center">
              Updating password successfully
            </p>
            <button
              onClick={() => setIsUpdatedPassword(false)}
              className="px-6 py-1 bg-dark-lighten rounded-full mt-3 tw-absolute-center-horizontal hover:brightness-75 transition duration-300"
            >
              OK
            </button>
          </div>
          <div
            onClick={() => setIsUpdatedPassword(false)}
            className="fixed top-0 left-0 w-full h-full z-[5] bg-black/60"
          ></div>
        </>
      )}
      <div className="mt-10 max-w-[600px]">
        <p className="text-white text-lg font-medium mb-3">Change password</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newPasswordValueRef.current.value.trim().length) {
              // alert();
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
            setIsShowPromptReAuthFor("password");
          }}
          className="flex justify-between gap-32 items-center"
        >
          <div className="flex-1">
            <input
              ref={newPasswordValueRef}
              type="password"
              className="bg-dark-lighten py-3 rounded-md  outline-none px-5 text-white w-full"
              placeholder="New password"
            />
          </div>
          <button className="px-6 py-4 bg-dark-lighten-2 rounded-xl hover:bg-dark-lighten transition duration-300 text-white">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Password;
