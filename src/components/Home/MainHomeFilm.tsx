import { FC } from "react";
import { HomeFilms } from "../../shared/types";
import Skeleton from "../Common/Skeleton";
import BannerSlider from "../Slider/BannerSlider";
import SectionSlider from "../Slider/SectionSlider";

interface MainHomeFilmsProps {
  data: HomeFilms | undefined;
  dataDetail: any;
  isLoadingBanner: boolean;
  isLoadingSection: boolean;
}

const MainHomeFilms: FC<MainHomeFilmsProps> = ({
  data,
  dataDetail,
  isLoadingBanner,
  isLoadingSection,
}) => {
  return (
    <>
      <BannerSlider
        films={data?.Trending}
        dataDetail={dataDetail}
        isLoadingBanner={isLoadingBanner}
      />

      <ul className="flex flex-col gap-10 mt-12">
        {isLoadingSection ? (
          <>
            {new Array(2).fill("").map((_, index) => (
              <li key={index}>
                <Skeleton className="mb-3 max-w-[10%] h-8 rounded-md" />
                <SectionSlider films={undefined} />
              </li>
            ))}
          </>
        ) : (
          Object.entries(data as HomeFilms)
            .filter((section) => section[0] !== "Trending")
            .map((section, index) => (
              <li key={index}>
                <h2 className="text-xl text-white font-medium tracking-wider mb-3">
                  {section[0]}
                </h2>

                <SectionSlider films={section[1]} />
              </li>
            ))
        )}
      </ul>
    </>
  );
};

export default MainHomeFilms;
