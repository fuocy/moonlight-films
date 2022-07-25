import { useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const location = useLocation();

  return new URLSearchParams(location.search);
};
