import React, { FunctionComponent } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterByDateProps {}

const FilterByDate: FunctionComponent<FilterByDateProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "from") {
      searchParams.set("from", e.target.value);
      setSearchParams(searchParams);
    } else {
      searchParams.set("to", e.target.value);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <label htmlFor="from">From</label>
        <input
          type="date"
          id="from"
          name="from"
          className="outline-none bg-dark-lighten-2 px-3 py-1 rounded-md"
          onChange={handleFilterDate}
          value={searchParams.get("from") || "2002-11-04"}
        />
      </div>
      <div className="flex justify-between items-center">
        <label htmlFor="to">To</label>
        <input
          type="date"
          id="to"
          name="to"
          className="outline-none bg-dark-lighten-2 px-3 py-1 rounded-md"
          onChange={handleFilterDate}
          value={searchParams.get("to") || "2022-07-28"}
        />
      </div>
    </div>
  );
};

export default FilterByDate;
