import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, FunctionComponent, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { db } from "../../shared/firebase";
import { convertErrorCodeToMessage } from "../../shared/utils";
import { useAppSelector } from "../../store/hooks";

interface NameProps {
  setIsUpdating: any;
}

const Name: FunctionComponent<NameProps> = ({ setIsUpdating }) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const firstNameValueRef = useRef<HTMLInputElement>(null!);
  const lastNameValueRef = useRef<HTMLInputElement>(null!);

  const changeName = (e: FormEvent) => {
    e.preventDefault();

    const firstNameValue = firstNameValueRef.current.value;
    const lastNameValue = lastNameValueRef.current.value;

    if (!firstNameValue.trim().length || !lastNameValue.trim().length) {
      alert("You gotta type something");
      return;
    }

    setIsUpdating(true);
    // @ts-ignore
    updateDoc(doc(db, "users", currentUser.uid), {
      firstName: firstNameValue,
      lastName: lastNameValue,
    })
      .then(() => {
        setIsUpdatingName(false);
      })
      .catch((error) => {
        console.log(error);
        alert(convertErrorCodeToMessage(error.code));
      })
      .finally(() => setIsUpdating(false));
  };

  return (
    <div>
      <p className="text-white text-lg">Name</p>
      {!isUpdatingName && (
        <div className="flex justify-between mt-1">
          <p>{currentUser?.displayName}</p>
          <button
            onClick={() => setIsUpdatingName(true)}
            className="hover:text-primary transition duration-300"
          >
            <AiOutlineEdit size={25} />
          </button>
        </div>
      )}
      {isUpdatingName && (
        <>
          <form onSubmit={changeName} className="flex justify-between mt-1">
            <div className="flex gap-3">
              <input
                type="text"
                ref={firstNameValueRef}
                autoFocus
                placeholder="First name"
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsUpdatingName(false);
                }}
                className="outline-none bg-dark-lighten rounded-md py-1 px-2 w-full"
              />
              <input
                type="text"
                ref={lastNameValueRef}
                placeholder="Last name"
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsUpdatingName(false);
                }}
                className="outline-none bg-dark-lighten rounded-md py-1 px-2 w-full"
              />
            </div>
            <button className="hover:text-primary transition duration-300">
              <BiSend size={25} />
            </button>
          </form>
          <p className="text-sm mt-1">Press Esc to cancel</p>
        </>
      )}
    </div>
  );
};

export default Name;
