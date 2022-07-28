import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FunctionComponent, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import FilterByDate from "./FilterByDate";
import FilterByGenres from "./FilterByGenres";
import FilterByRating from "./FilterByRating";

interface FilterByProps {
  currentTab: string;
}

const FilterBy: FunctionComponent<FilterByProps> = ({ currentTab }) => {
  const [filter] = useAutoAnimate();

  const [openFilter, setOpenFilter] = useState(true);

  return (
    <div
      // @ts-ignore
      ref={filter}
      className="bg-dark-lighten rounded-md shadow-md px-4 py-3 mt-8"
    >
      <div className="flex justify-between items-center text-white pb-3">
        <p className="text-lg">Filter</p>
        <button onClick={() => setOpenFilter((prev) => !prev)}>
          {openFilter && <FiChevronDown size={20} />}
          {!openFilter && <FiChevronRight size={20} />}
        </button>
      </div>
      {openFilter && (
        <div className="py-3 border-t border-dark-darken">
          <p className="text-lg mb-4 text-white/80">Genres</p>
          <FilterByGenres currentTab={currentTab} />

          <p className="text-lg mb-2 mt-8 text-white/80">Runtime</p>
          <FilterByRating />
          <p className="text-lg mb-2 mt-8 text-white/80">Release Dates</p>
          <FilterByDate />
        </div>
      )}
    </div>
  );
};

export default FilterBy;
