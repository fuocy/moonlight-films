import { FunctionComponent, useState } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import Title from "../components/Common/Title";

interface AuthProps {}

const Auth: FunctionComponent<AuthProps> = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <>
      <Title value={"Sign In | Moonlight"} />

      <video
        autoPlay
        muted
        loop
        id="myVideo"
        className="fixed -top-[135px] object-cover left-0 h-[135vh] w-full -z-10"
      >
        <source
          src="https://raw.githubusercontent.com/fuocy/video/master/endgame.mp4"
          type="video/mp4"
        />
      </video>

      <div className="bg-black/80 min-h-screen">
        {!isSignIn && <SignUp setIsSignIn={setIsSignIn} isSignIn={isSignIn} />}
        {isSignIn && <SignIn setIsSignIn={setIsSignIn} isSignIn={isSignIn} />}
      </div>
    </>
  );
};

export default Auth;
