import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FunctionComponent, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import FilterByGenres from "./FilterByGenres";

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
      className="bg-dark-lighten rounded-md shadow-md px-4 pt-3 mt-8"
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
          <p className="text-lg mb-2">Genre</p>

          <FilterByGenres currentTab={currentTab} />
        </div>
      )}
    </div>
  );
};

export default FilterBy;
