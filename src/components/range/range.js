import React, { useState, useRef, useCallback } from "react";
import "./range.css";

const Range = ({ min, max, onChange }) => {
  const rangeRef = useRef(null);
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const getPositionFromEvent = useCallback(
    (event) => {
      const rangeRect = rangeRef.current.getBoundingClientRect();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const position = clientX - rangeRect.left; // Posición dentro del rango
      const percentage = position / rangeRect.width; // Convertir a porcentaje
      const value = min + percentage * (max - min); // Convertir a valor
      return Math.min(Math.max(value, min), max); // Limitar entre min y max
    },
    [min, max]
  );

  const startDrag = useCallback(
    (event, type) => {
      event.preventDefault(); // Prevenir comportamiento por defecto para mejorar la experiencia de arrastre

      const moveHandler = (moveEvent) => {
        moveEvent.preventDefault(); // Prevenir comportamiento por defecto durante el arrastre
        const value = getPositionFromEvent(moveEvent);
        if (type === "min") {
          setMinValue((prev) => Math.max(min, Math.min(value, maxValue - 1))); // Asegurar que min no sea mayor que max
        } else {
          setMaxValue((prev) => Math.min(max, Math.max(value, minValue + 1))); // Asegurar que max no sea menor que min
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

  // Convertir valores de min y max a porcentajes para su representación en la UI
  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="range-slider" ref={rangeRef}>
      <div className="range-line"></div>
      <div
        className="range-bullet range-bullet-min"
        style={{ left: `${minPercentage}%` }}
        onMouseDown={(e) => startDrag(e, "min")}
        onTouchStart={(e) => startDrag(e, "min")}
      ></div>
      <div
        className="range-bullet range-bullet-max"
        style={{ left: `${maxPercentage}%` }}
        onMouseDown={(e) => startDrag(e, "max")}
        onTouchStart={(e) => startDrag(e, "max")}
      ></div>
      <div
        className="range-value range-value-min"
        style={{ left: `${minPercentage}%` }}
      >{`${Math.round(minValue)}€`}</div>
      <div
        className="range-value range-value-max"
        style={{ left: `${maxPercentage}%` }}
      >{`${Math.round(maxValue)}€`}</div>
    </div>
  );
};

export default Range;
