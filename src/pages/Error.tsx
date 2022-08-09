import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useCurrentViewportView } from "../hooks/useCurrentViewportView";

interface ErrorProps {}

const Error: FunctionComponent<ErrorProps> = () => {
  const { isMobile } = useCurrentViewportView();
  return (
    <>
      {!isMobile && (
        <video
          autoPlay
          muted
          loop
          id="myVideo"
          className="fixed top-0 left-0 min-h-screen min-w-full -z-10 object-cover"
        >
          <source
            src="https://raw.githubusercontent.com/fuocy/video/master/Studio%20Project%20%E2%80%94%20Kapwing.mp4"
            type="video/mp4"
          />
        </video>
      )}

      <div className="md:bg-black/60 bg-dark min-h-screen tw-flex-center">
        <div>
          <p className="text-[150px] text-white font-semibold leading-none">
            404
          </p>
          <p className="mt-6 text-white text-2xl text-center">
            There is nothing here
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="px-8 py-2 bg-primary rounded-md text-white text-xl mt-8 inline-block hover:bg-blue-600 transition duration-300"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
