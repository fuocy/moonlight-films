import { FC } from "react";
import { HomeFilms } from "../shared/types";
import BannerSlider from "./Slider/BannerSlider";
import SectionSlider from "./Slider/SectionSlider";

interface MainHomeFilmsProps {
  data: HomeFilms;
  dataDetail: any;
}

const MainHomeFilms: FC<MainHomeFilmsProps> = ({ data, dataDetail }) => {
  return (
    <>
      <BannerSlider films={data.Trending} dataDetail={dataDetail} />

      <ul className="flex flex-col gap-10 mt-16">
        {Object.entries(data)
          .filter((section) => section[0] !== "Trending")
          .map((section, index) => (
            <li key={index}>
              <h2 className="text-xl text-white font-medium tracking-wider mb-3">
                {section[0]}
              </h2>

              <SectionSlider films={section[1]} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default MainHomeFilms;
