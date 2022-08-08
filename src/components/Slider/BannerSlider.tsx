import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { Item } from "../../shared/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { resizeImage } from "../../shared/utils";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import Skeleton from "../Common/Skeleton";
import { useCurrentViewportView } from "../../hooks/useCurrentViewportView";
interface BannerSliderProps {
  films: Item[] | undefined;
  dataDetail: {
    genre: { id: number; name: string }[];
    translation: string[];
  }[];
  isLoadingBanner: boolean;
}

const BannerSlider: FC<BannerSliderProps> = ({
  films,
  dataDetail,
  isLoadingBanner,
}) => {
  const { isMobile } = useCurrentViewportView();

  return (
    <div className="mt-6 relative h-0 md:pb-[45%] pb-[55%]  tw-banner-slider">
      {isLoadingBanner ? (
        <Skeleton className="absolute top-0 left-0 w-full h-full rounded-lg" />
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          slidesPerView={1}
          className="!absolute !top-0 !left-0 !w-full !h-full  !rounded-lg"
        >
          {(films as Item[]).map((film, index) => (
            <SwiperSlide key={film.id}>
              <Link
                to={
                  film.media_type === "movie"
                    ? `/movie/${film.id}`
                    : `/tv/${film.id}`
                }
                className="group"
              >
                <LazyLoadImage
                  src={resizeImage(film.backdrop_path, "w1280")}
                  alt="Backdrop image"
                  effect="blur"
                />

                <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none tw-black-backdrop group-hover:bg-[#00000026] transition duration-7000"></div>
                <div className="hidden md:flex absolute top-[5%] right-[3%] bg-primary px-3 py-1 rounded-full text-white  items-center gap-1">
                  <span>{film.vote_average.toFixed(1)}</span>
                  <AiFillStar size={15} />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-16 h-16 rounded-full bg-gradient-to-br from-primary to-[#c353b4] tw-flex-center z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-700">
                  <BsFillPlayFill size={35} className="text-white" />
                </div>

                <div className="absolute top-[50%] -translate-y-1/2 left-[5%] md:max-w-md max-w-[200px]">
                  <h2 className="md:text-5xl text-xl  text-primary font-black tracking-wide md:tw-multiline-ellipsis-2 tw-multiline-ellipsis-3">
                    {film.title || film.name}
                  </h2>
                  <div className="">
                    <p className="text-white font-semibold md:text-2xl text-base mt-6">
                      {dataDetail[index].translation[0] ||
                        dataDetail[index].translation[1] ||
                        dataDetail[index].translation[2] ||
                        dataDetail[index].translation[3] ||
                        dataDetail[index].translation[4] ||
                        dataDetail[index].translation[5]}
                    </p>
                    <p className="mt-1">
                      {film.release_date &&
                        `Release date: ${film.release_date}`}
                      {film.first_air_date &&
                        `First air date: ${film.first_air_date}`}
                    </p>
                    {!isMobile && (
                      <>
                        <div className="flex gap-2 flex-wrap mt-5">
                          {dataDetail[index].genre.map((genre) => (
                            <div
                              className="px-3 py-1 border rounded-full "
                              key={genre.id}
                            >
                              {genre.name}
                            </div>
                          ))}
                        </div>
                        <p className=" mt-3 text-base  tw-multiline-ellipsis">
                          {film.overview}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="absolute top-0 left-0 w-[8%] h-[11%] z-10"></div>
        </Swiper>
      )}
    </div>
  );
};

export default BannerSlider;
