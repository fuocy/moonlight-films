import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { db } from "../../shared/firebase";
import { useAppSelector } from "../../store/hooks";

interface ProfileImageProps {}

const ProfileImage: FunctionComponent<ProfileImageProps> = () => {
  const [isUpdatingImg, setIsUpdatingImg] = useState(false);
  const [quote, setQuote] = useState("");
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    axios
      .get("https://api.quotable.io/random")
      .then((res) => setQuote(res.data.content));
  }, []);

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

  return (
    <div className="shrink-0 md:max-w-[500px] w-full px-4">
      <p className="text-white mt-5 text-xl font-medium">Profile photo</p>
      <div className="flex flex-col items-center mt-4 ">
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
          className="px-5 py-3 mt-6 rounded-full bg-dark-lighten flex items-center gap-3 hover:brightness-75 transition duration-300 cursor-pointer"
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

        <div className="text-center md:mt-16 mt-8">
          <p className="text-white text-xl ">{currentUser?.displayName}</p>
          {quote && <p className="text-lg mt-2">{quote}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
