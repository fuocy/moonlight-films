import { FunctionComponent } from "react";
import FilterBy from "./FilterBy";
import SortBy from "./SortBy";
interface ExploreFilterProps {
  config: { [key: string]: string };
  currentTab: string;
}

const ExploreFilter: FunctionComponent<ExploreFilterProps> = ({
  config,
  currentTab,
}) => {
  return (
    <>
      <SortBy config={config} />
      <FilterBy currentTab={currentTab} />
    </>
  );
};

export default ExploreFilter;
