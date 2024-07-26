import { useSearchParams } from "react-router-dom";
import { SUPPORTED_QUERY } from "../shared/constants";

// My purpose is to append search parameter to the url without replace the existing search parameter.

// I have 2 ways of doing that. The first way is not optimal

// this peace of code is of the first way. I could delete it but I'd like to keep it as a reference.

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
