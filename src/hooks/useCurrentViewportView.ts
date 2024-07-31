import { useEffect, useState } from "react";
import { debounce } from "lodash-es";
export const useCurrentViewportView = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWidthDebounce = debounce(
      () => setWidth(window.innerWidth),
      300
    );

    window.addEventListener("resize", updateWidthDebounce);

    return () => window.removeEventListener("resize", updateWidthDebounce);
  }, []);

  return { width, isMobile: width < 768 };
};
