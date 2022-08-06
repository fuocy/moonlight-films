import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineUpload } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Sidebar from "../components/Common/Sidebar";
import Title from "../components/Common/Title";
import { db } from "../shared/firebase";
import { useAppSelector } from "../store/hooks";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isUpdatingImg, setIsUpdatingImg] = useState(false);

  const changeProfileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUpdatingImg(true);
      if (!currentUser) return;

      const form = new FormData();
      // @ts-ignore
      form.append("image", e.target.files[0]);
      const res = await axios({
        method: "post",
        url: `https://api.imgbb.com/1/upload?key=02efec2c3808e9fdeb329eaca6ba30e0`,
        data: form,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      updateDoc(doc(db, "users", currentUser.uid), {
        photoUrl: res.data.data.display_url,
      }).finally(() => setIsUpdatingImg(false));
    } catch (error) {
      console.log(error);
    }
  };

  const [quote, setQuote] = useState("");

  useEffect(() => {
    axios
      .get("https://api.quotable.io/random")
      .then((res) => setQuote(res.data.content));
  }, []);

  return (
    <>
      <Title value="Profile | Moonlight" />
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
                The changes will be displayed for other users within 5 minutes .
              </p>

              <div className="mt-7 max-w-[600px] w-full flex flex-col gap-3">
                <div>
                  <p className="text-white text-lg">Email</p>
                  <div className="flex justify-between mt-1">
                    <p>{currentUser?.email}</p>
                    <button className="hover:text-primary transition duration-300">
                      <AiOutlineEdit size={25} />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-white text-lg">Name</p>
                  <div className="flex justify-between mt-1">
                    <p>{currentUser?.displayName}</p>
                    <button className="hover:text-primary transition duration-300">
                      <AiOutlineEdit size={25} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-between max-w-[600px]">
                <p className="text-white text-lg">
                  Your email is not verified yet.
                </p>
                <button className="text-primary underline text-lg">
                  Send me verification email
                </button>
              </div>

              <div className="mt-10 max-w-[600px]">
                <p className="text-white text-lg font-medium mb-3">
                  Change password
                </p>
                <div className="flex justify-between gap-32 items-center">
                  <div className="flex-1">
                    <input
                      type="text"
                      className="bg-dark-lighten py-3 rounded-md  outline-none px-5 text-white mb-4 w-full"
                      placeholder="Old password..."
                    />
                    <input
                      type="text"
                      className="bg-dark-lighten py-3 rounded-md  outline-none px-5 text-white w-full"
                      placeholder="Type new password..."
                    />
                  </div>
                  <button className="px-6 py-4 bg-dark-lighten-2 rounded-xl hover:bg-dark-lighten transition duration-300 text-white">
                    Update
                  </button>
                </div>
              </div>

              <div className="flex justify-center mt-12">
                <button className="px-5 py-2  border rounded-full text-red-500 border-dark-lighten-2 bg-dark-lighten hover:bg-red-500 hover:text-white transition duration-300">
                  Delete account
                </button>
              </div>
            </div>
            <div className="shrink-0 max-w-[500px] w-full px-4">
              <p className="text-white mt-5 text-xl font-medium">
                Profile photo
              </p>
              <div className="flex flex-col gap-8 items-center mt-4 ">
                <div className="w-[250px] h-[250px] relative">
                  <LazyLoadImage
                    src={currentUser?.photoURL || "/defaultAvatar.jpg"}
                    alt="profile picture"
                    className="w-[250px] h-[250px] rounded-full object-cover"
                  />
                  {isUpdatingImg && (
                    <div className="border-[4px] border-dark border-t-transparent h-12 w-12 rounded-full animate-spin absolute top-[40%] left-[40%] z-10"></div>
                  )}
                </div>

                <label
                  htmlFor="upload-img"
                  className="px-5 py-3 rounded-full bg-dark-lighten flex items-center gap-3 hover:brightness-75 transition duration-300 cursor-pointer"
                >
                  <HiOutlineUpload size={25} className="text-primary" />
                  <p className="text-white">Upload new photo</p>
                </label>
                <input
                  id="upload-img"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={changeProfileImage}
                />

                <div className="text-center">
                  <p className="text-white text-xl mt-6">Bio</p>
                  {quote && <p className="text-lg">{quote}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
