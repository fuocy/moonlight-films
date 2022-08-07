import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { FunctionComponent, useRef, useState } from "react";
import Sidebar from "../components/Common/Sidebar";
import Title from "../components/Common/Title";
import DeleteAccount from "../components/Profile/DeleteAcount";
import Email from "../components/Profile/Email";
import EmailVerification from "../components/Profile/EmailVerification";
import Name from "../components/Profile/Name";
import Password from "../components/Profile/Password";
import ProfileImage from "../components/Profile/ProfileImage";
import { auth } from "../shared/firebase";
import { convertErrorCodeToMessage } from "../shared/utils";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const emailValueRef = useRef<HTMLInputElement>(null!);

  const [isUpdatedPassword, setIsUpdatedPassword] = useState(false);
  const oldPasswordValueRef = useRef<HTMLInputElement>(null!);
  const newPasswordValueRef = useRef<HTMLInputElement>(null!);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isShowPromptReAuthFor, setIsShowPromptReAuthFor] = useState<
    string | undefined
  >();
  const firebaseUser = auth.currentUser;

  const reAuthentication = async (type: string) => {
    const oldPassword = oldPasswordValueRef.current.value;

    if (!oldPassword.trim().length) {
      alert("You gotta type something");
      return;
    }

    const credential = EmailAuthProvider.credential(
      // @ts-ignore
      firebaseUser.email,
      oldPassword
    );

    reauthenticateWithCredential(
      // @ts-ignore
      firebaseUser,
      credential
    )
      .then(() => {
        if (type === "password") {
          changePassword();
        } else if (type === "email") {
          changeEmail();
        } else if (type === "delete") {
          deleteAccount();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(convertErrorCodeToMessage(error.code));
      })
      .finally(() => setIsShowPromptReAuthFor(undefined));
  };

  const changeEmail = () => {
    const emailValue = emailValueRef.current.value;

    if (!emailValue.trim().length) {
      alert("You gotta type something");
      return;
    }
    setIsUpdating(true);
    // @ts-ignore
    updateEmail(firebaseUser, emailValue)
      .then(() => {
        setIsUpdatingEmail(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(convertErrorCodeToMessage(error.code));
      })
      .finally(() => setIsUpdating(false));
  };

  const changePassword = () => {
    const newPassword = newPasswordValueRef.current.value;
    if (!newPassword.trim().length) {
      alert("You gotta type something");
      return;
    }
    setIsUpdating(true);
    // @ts-ignore
    updatePassword(firebaseUser, newPassword)
      .then(() => {
        setIsUpdatedPassword(true);
        newPasswordValueRef.current.value = "";
      })
      .catch((error) => {
        console.log(error);
        alert(convertErrorCodeToMessage(error.code));
      })
      .finally(() => setIsUpdating(false));
  };

  const deleteAccount = () => {
    setIsUpdating(true);
    // @ts-ignore
    deleteUser(firebaseUser)
      .then(() => {})
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <>
      <Title value="Profile | Moonlight" />

      {isShowPromptReAuthFor && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              reAuthentication(isShowPromptReAuthFor);
            }}
            className="z-10 absolute max-w-[500px] min-h-[200px] w-full top-[40%] left-[35%] bg-dark-lighten rounded-md px-3 py-2"
          >
            <p className="text-white font-medium mb-3 text-lg text-center">
              Type your password again to reauthenticate
            </p>
            <input
              ref={oldPasswordValueRef}
              type="password"
              autoFocus
              className="bg-dark-lighten-2 py-3 mt-3 rounded-md  outline-none px-5 text-white mb-4 w-full"
              placeholder="Type your password..."
            />
            <button className="px-6 py-4 bg-dark-lighten-2 rounded-xl hover:brightness-125 transition duration-300 text-white top-[130px] tw-absolute-center-horizontal">
              Continue
            </button>
          </form>
          <div
            onClick={() => setIsShowPromptReAuthFor(undefined)}
            className="fixed top-0 left-0 w-full h-full z-[5] bg-black/60"
          ></div>
        </>
      )}

      {isUpdating && (
        <>
          <div className="border-[8px] border-primary border-t-transparent h-32 w-32 rounded-full animate-spin absolute top-[40%] left-[40%] z-10"></div>
          <div className="fixed top-0 left-0 w-full h-full z-[5]"></div>
        </>
      )}

      <div className="flex">
        <Sidebar />
        <div className="flex-grow pt-7 pl-10">
          <div className="pb-4 border-b border-dark-lighten-2">
            <h1 className="text-[35px] text-white font-semibold uppercase">
              Account settings
            </h1>
          </div>
          <div className="flex">
            <div className="flex-grow">
              <p className="text-white mt-5 text-xl font-medium mb-3">
                User Information
              </p>
              <p>Here you can edit public information about yourself.</p>
              <p>
                If you signed in with Google or Facebook, you can't change your
                email and password.
              </p>

              <div className="mt-7 max-w-[600px] w-full flex flex-col gap-3">
                <Email
                  setIsShowPromptReAuthFor={setIsShowPromptReAuthFor}
                  isUpdatingEmail={isUpdatingEmail}
                  setIsUpdatingEmail={setIsUpdatingEmail}
                  emailValueRef={emailValueRef}
                />
                <Name setIsUpdating={setIsUpdating} />
              </div>

              <EmailVerification setIsUpdating={setIsUpdating} />

              <Password
                setIsShowPromptReAuthFor={setIsShowPromptReAuthFor}
                isUpdatedPassword={isUpdatedPassword}
                setIsUpdatedPassword={setIsUpdatedPassword}
                newPasswordValueRef={newPasswordValueRef}
              />

              <DeleteAccount
                setIsShowPromptReAuthFor={setIsShowPromptReAuthFor}
              />
            </div>
            <ProfileImage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
