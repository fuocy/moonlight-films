import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ModalNotificationProps {
  type: string;
  message: string;
  setError?: any;
}
const TIMEOUT_AUTO_CLOSE_ERROR = 5;
const TIMEOUT_AUTO_CLOSE_SUCCESS = 2;
const ModalNotification: FunctionComponent<ModalNotificationProps> = ({
  type,
  message,
  setError,
}) => {
  const [timeLeft, setTimeLeft] = useState(
    type === "success" ? TIMEOUT_AUTO_CLOSE_SUCCESS : TIMEOUT_AUTO_CLOSE_ERROR
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isCloseModalAutomatically = timeLeft === 0;

  useEffect(() => {
    if (isCloseModalAutomatically) {
      if (type === "success") {
        navigate(`${searchParams.get("redirect") || "/"}`);
      } else {
        setError("");
      }
    }
    // eslint-disable-next-line
  }, [isCloseModalAutomatically]);

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timeout); // => so when "error" is set empty, the component unmount, this interval timer is clear
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `${
            type === "success" ? "url('/success.jpg')" : "url('/fail.jpg')"
          } `,
        }}
        className="bg-cover bg-no-repeat bg-center min-h-[450px] max-w-[350px] w-full fixed z-30 tw-absolute-center rounded-xl"
      >
        <div className="mt-[230px] font-bold text-black text-[40px] text-center">
          {type === "success" ? "Woo hoo!" : "Oh no."}
        </div>
        <p className="text-xl text-gray-600 text-center mt-1 font-medium">
          {message}
          <br></br>
          {type === "error" && <span>Keep calm and try again.</span>}
          {type === "success" && <span>Let's "Moonlight and chill".</span>}
        </p>
        <button
          onClick={() => {
            if (type === "success") {
              navigate(`${searchParams.get("redirect") || "/"}`);
            } else {
              setError("");
            }
          }}
          className={`${
            type === "success"
              ? "bg-primary shadow-primary hover:bg-blue-600"
              : "bg-red-500 shadow-red-500 hover:bg-red-600"
          } px-4 py-2 rounded-md shadow-md text-white mt-5 absolute left-1/2 -translate-x-1/2  transition duration-300 flex gap-2 items-center`}
        >
          <p>{type === "success" ? "CONTINUE" : "TRY AGAIN"} </p>
          <p>({timeLeft})</p>
        </button>
      </div>
      <div
        onClick={() => setError("")}
        className="fixed top-0 left-0 w-full h-full z-20 bg-black/60"
      ></div>
    </>
  );
};

export default ModalNotification;
