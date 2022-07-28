import { FunctionComponent } from "react";
import FilterBy from "./FilterBy";
import SortBy from "./SortBy";
interface ExploreFilterProps {
  currentTab: string;
}

const ExploreFilter: FunctionComponent<ExploreFilterProps> = ({
  currentTab,
}) => {
  return (
    <>
      <SortBy />
      <FilterBy currentTab={currentTab} />
    </>
  );
};

export default ExploreFilter;
