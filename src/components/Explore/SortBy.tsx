import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FunctionComponent, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

interface SortByProps {
  config: { [key: string]: string };
}

const SortBy: FunctionComponent<SortByProps> = ({ config }) => {
  const navigate = useNavigate();
  const [openSort, setOpenSort] = useState(true);
  const [parent] = useAutoAnimate();

  const options = [
    { value: "popularity.desc", label: "Most popular" },
    { value: "vote_average.desc", label: "Most rating" },
    { value: "release_date.desc", label: "Most recent" },
  ];

  if (Object.keys(config).length === 0) return <div>wait</div>;

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "#49494b",
      boxShadow: "none",
      border: 0,
    }),
    option: (
      styles: any,
      { data, isDisabled, isFocused, isSelected }: any
    ) => ({
      ...styles,
      backgroundColor: isSelected ? "#989898" : "#49494b",
    }),

    singleValue: (provided: any) => {
      return { ...provided, color: "white" };
    },

    menu: (styles: any) => ({
      ...styles,
      backgroundColor: "#49494b",
    }),
  };

  return (
    <div
      // @ts-ignore
      ref={parent}
      className="bg-dark-lighten rounded-md shadow-md px-4 pt-3"
    >
      <div className="flex justify-between items-center text-white pb-3">
        <p className="text-lg ">Sort</p>
        <button onClick={() => setOpenSort((prev) => !prev)}>
          {openSort && <FiChevronDown size={20} />}
          {!openSort && <FiChevronRight size={20} />}
        </button>
      </div>
      {openSort && (
        <div className="py-3 border-t border-dark-darken">
          <p className="text-lg mb-2">Sort results by </p>
          <Select
            options={options}
            styles={customStyles}
            defaultValue={options.find(
              (option) => option.value === config.sort_by
            )}
            // @ts-ignore
            // onChange={(e) => onChangeConfig("sort_by", e?.value)}
            onChange={(e) =>
              navigate({
                pathname: "",
                search: `?sort_by=${encodeURIComponent(e?.value || "")}`,
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default SortBy;
