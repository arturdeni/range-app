import React, { useState, useRef, useCallback } from "react";
import "./range.css";

const Range = ({ min, max, onChange, availableValues = [] }) => {
  const rangeRef = useRef(null);
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const findClosestValue = useCallback(
    (value) => {
      if (availableValues.length > 0) {
        return availableValues.reduce((prev, curr) =>
          Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        );
      }
      return value;
    },
    [availableValues]
  );

  const getPositionFromEvent = useCallback(
    (event) => {
      const rangeRect = rangeRef.current.getBoundingClientRect();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const position = clientX - rangeRect.left;
      const percentage = position / rangeRect.width;
      const unroundedValue = min + percentage * (max - min);
      const value = findClosestValue(unroundedValue);
      return Math.min(Math.max(value, min), max);
    },
    [min, max, findClosestValue]
  );

  const startDrag = useCallback(
    (event, type) => {
      event.preventDefault();

      const moveHandler = (moveEvent) => {
        moveEvent.preventDefault();
        const value = getPositionFromEvent(moveEvent);
        if (type === "min") {
          setMinValue((prev) => Math.max(min, Math.min(value, maxValue - 1)));
        } else {
          setMaxValue((prev) => Math.min(max, Math.max(value, minValue + 1)));
        }
      };

      const upHandler = () => {
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", upHandler);
        document.removeEventListener("touchmove", moveHandler);
        document.removeEventListener("touchend", upHandler);
        onChange({ min: minValue, max: maxValue });
      };

      document.addEventListener("mousemove", moveHandler);
      document.addEventListener("mouseup", upHandler);
      document.addEventListener("touchmove", moveHandler);
      document.addEventListener("touchend", upHandler);
    },
    [getPositionFromEvent, minValue, maxValue, onChange, min, max]
  );

  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  return (
    <div
      className="range-slider"
      ref={rangeRef}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={minValue}
    >
      <div className="range-line"></div>
      <div
        className="range-bullet range-bullet-min"
        style={{ left: `${minPercentage}%` }}
        onMouseDown={(e) => startDrag(e, "min")}
        onTouchStart={(e) => startDrag(e, "min")}
        data-testid="min-bullet"
      ></div>
      <div
        className="range-bullet range-bullet-max"
        style={{ left: `${maxPercentage}%` }}
        onMouseDown={(e) => startDrag(e, "max")}
        onTouchStart={(e) => startDrag(e, "max")}
        data-testid="max-bullet"
      ></div>
      <div
        className="range-value range-value-min"
        style={{ left: `${minPercentage}%` }}
        data-testid="min-value"
      >{`${Math.round(minValue)}€`}</div>
      <div
        className="range-value range-value-max"
        style={{ left: `${maxPercentage}%` }}
        data-testid="max-value"
      >{`${Math.round(maxValue)}€`}</div>
    </div>
  );
};

export default Range;
