import { FunctionComponent, useState } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import Title from "../components/Common/Title";
import { useCurrentViewportView } from "../hooks/useCurrentViewportView";

interface AuthProps {}

const Auth: FunctionComponent<AuthProps> = () => {
  const [isShowSignInBox, setIsShowSignInBox] = useState(true);
  const { isMobile } = useCurrentViewportView();
  return (
    <>
      <Title value={"Sign In | Moonlight"} />

      {!isMobile && (
        <video
          autoPlay
          muted
          loop
          id="myVideo"
          className="fixed md:-top-[130px] -top-[155px] object-cover left-0 h-[135vh] w-full -z-10"
        >
          <source
            src="https://raw.githubusercontent.com/fuocy/video/master/endgame.mp4"
            type="video/mp4"
          />
        </video>
      )}

      <div className="md:bg-black/80 bg-dark min-h-screen">
        {!isShowSignInBox && <SignUp setIsShowSignInBox={setIsShowSignInBox} />}
        {isShowSignInBox && <SignIn setIsShowSignInBox={setIsShowSignInBox} />}
      </div>
    </>
  );
};

export default Auth;
