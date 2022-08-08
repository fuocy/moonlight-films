import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FormEvent, FunctionComponent, useRef, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import { auth } from "../../shared/firebase";
import { convertErrorCodeToMessage } from "../../shared/utils";
import { useAppSelector } from "../../store/hooks";
import ModalNotification from "./ModalNotification";
import { signInWithProvider } from "./signInWithProvider";

interface SignInProps {
  setIsSignIn: any;
  isSignIn: boolean;
}

const SignIn: FunctionComponent<SignInProps> = ({ setIsSignIn, isSignIn }) => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signInHandler = (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        setError(convertErrorCodeToMessage(error.code));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {currentUser && (
        <ModalNotification type="success" message={"Sign in successfully"} />
      )}
      {isLoading && (
        <div className="z-10 tw-flex-center h-screen relative">
          <div className="w-28 h-28 border-[10px] rounded-full border-primary border-t-transparent animate-spin "></div>
        </div>
      )}
      {error && (
        <ModalNotification type="error" message={error} setError={setError} />
      )}

      <div className="px-4 py-2 rounded-xl max-w-xl w-full min-h-[500px] text-white/70 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center mb-5">
          <div className="text-[50px] font-semibold mb-1 mx-auto">
            <div className="text-primary leading-none mb-4 text-center">
              Sign In To Moonlight
            </div>
          </div>
          <div className="flex gap-4 mb-8">
            <button
              onClick={() =>
                signInWithProvider(new GoogleAuthProvider(), "google")
              }
              className="h-12 w-12 rounded-full bg-white tw-flex-center hover:brightness-75 transition duration-300"
            >
              <FcGoogle size={25} className="text-primary" />
            </button>
            <button
              onClick={() =>
                signInWithProvider(new FacebookAuthProvider(), "facebook")
              }
              className="h-12 w-12 rounded-full bg-white tw-flex-center hover:brightness-75 transition duration-300"
            >
              <FaFacebookF size={25} className="text-primary" />
            </button>
          </div>
          <p className="text-lg">or use your email account: </p>
        </div>

        <form onSubmit={signInHandler}>
          <div className="relative mb-6">
            <input
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Email"
              className="w-full bg-dark-lighten px-5 py-4 pr-12 rounded-xl outline-none peer text-white"
            />
            <label
              htmlFor="email"
              className={`absolute left-5 text-gray-400 transition duration-500 pointer-events-none 
        translate-y-[-50%] visible peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible peer-placeholder-shown:translate-y-[-10%] ease-in-out
        `}
            >
              Email
            </label>
            <AiOutlineMail
              size={25}
              className="absolute top-1/2 -translate-y-1/2 right-4"
            />
          </div>
          <div className="relative mb-12">
            <input
              ref={passwordRef}
              name="password"
              type="password"
              placeholder="Password"
              className="w-full bg-dark-lighten px-5 py-4 pr-12 rounded-xl outline-none peer text-white"
            />
            <label
              htmlFor="password"
              className={`absolute left-5 text-gray-400 transition duration-500 pointer-events-none 
        translate-y-[-50%] visible peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible peer-placeholder-shown:translate-y-[-10%] ease-in-out
        `}
            >
              Password
            </label>
            <RiLockPasswordLine
              size={25}
              className="absolute top-1/2 -translate-y-1/2 right-4"
            />
          </div>
          <button className="px-12 py-3 bg-primary rounded-full text-lg text-white uppercase absolute left-1/2 -translate-x-1/2 hover:bg-[#4161cc] transition duration-300">
            Sign In
          </button>
        </form>

        <p className="text-xl flex gap-2 mt-32 justify-center">
          <span>Not a member?</span>
          <button
            type="submit"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-primary/90 underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
};

export default SignIn;
