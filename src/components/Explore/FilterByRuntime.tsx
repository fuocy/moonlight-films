import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MAX_RUNTIME, GAP } from "../../shared/constants";
interface FilterByRuntimeProps {}

const FilterByRuntime: FunctionComponent<FilterByRuntimeProps> = () => {
  const sliderRangeRef = useRef<HTMLDivElement>(null!);

  const [minRuntime, setMinRuntime] = useState(0);
  const [maxRuntime, setMaxRuntime] = useState(200);

  const timeoutRef = useRef<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    updateMinRangeBar(Number(searchParams.get("minRuntime")) ?? 0);
    updateMaxRangeBar(Number(searchParams.get("maxRuntime")) || 200);

    // eslint-disable-next-line
  }, [window.location.search]);

  const updateMinRangeBar = (value: number) => {
    setMinRuntime(value);
    const leftOffet = (value / MAX_RUNTIME) * 100;
    sliderRangeRef.current.style.left = leftOffet + "%";
  };

  const updateMaxRangeBar = (value: number) => {
    setMaxRuntime(value);
    const rightOffet = 100 - (value / MAX_RUNTIME) * 100;
    sliderRangeRef.current.style.right = rightOffet + "%";
  };

  const handleDragSliderRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (e.target.name === "min-range") {
      updateMinRangeBar(
        maxRuntime - Number(e.target.value) < GAP
          ? maxRuntime - GAP
          : Number(e.target.value)
      );

      timeoutRef.current = setTimeout(() => {
        searchParams.set("minRuntime", e.target.value);
        setSearchParams(searchParams);
      }, 500);
    } else {
      updateMaxRangeBar(
        Number(e.target.value) - minRuntime < GAP
          ? minRuntime + GAP
          : Number(e.target.value)
      );

      timeoutRef.current = setTimeout(() => {
        searchParams.set("maxRuntime", e.target.value);
        setSearchParams(searchParams);
      }, 500);
    }
  };

  return (
    <section>
      <div className="flex justify-between mb-3">
        <div className="flex gap-2 items-center">
          <span>From</span>
          <p className="flex gap-1 items-center">
            <span className="text-lg font-medium text-white/60">
              {minRuntime}
            </span>
            <span className="text-sm">min</span>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <span>To</span>
          <p className="flex gap-1 items-center">
            <span className="text-lg font-medium text-white/60">
              {maxRuntime}
            </span>
            <span className="text-sm">min</span>
          </p>
        </div>
      </div>

      <div className="relative h-[5px] bg-dark-darken rounded-md">
        <div
          ref={sliderRangeRef}
          className="absolute top-0 h-[5px] bg-primary rounded-md"
        ></div>
      </div>

      <div className="relative">
        <input
          className="absolute -top-[5px] left-0 w-full h-[5px] appearance-none [background:none] pointer-events-none tw-slider-range"
          type="range"
          min="0"
          max={MAX_RUNTIME}
          step="10"
          name="min-range"
          value={minRuntime}
          onChange={handleDragSliderRange}
        />
        <input
          className="absolute -top-[5px] left-0 w-full h-[5px] appearance-none [background:none] pointer-events-none tw-slider-range"
          type="range"
          min="0"
          max={MAX_RUNTIME}
          step="10"
          name="max-range"
          value={maxRuntime}
          onChange={handleDragSliderRange}
        />
      </div>
    </section>
  );
};

export default FilterByRuntime;
