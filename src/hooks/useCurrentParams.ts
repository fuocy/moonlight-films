import { useSearchParams } from "react-router-dom";
import { SUPPORTED_QUERY } from "../shared/constants";

export const useCurrentParams = () => {
  const [searchParam] = useSearchParams();

  const currentSearchParams = JSON.parse(JSON.stringify(SUPPORTED_QUERY)) as {
    [key: string]: string[];
  };

  searchParam.forEach((value, key) => {
    currentSearchParams[key].push(value);
  });

  return [currentSearchParams] as const;
};
