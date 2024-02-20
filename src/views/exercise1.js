import React, { useState, useEffect } from "react";
import Range from "../components/range/range";

const Exercise1 = () => {
  const [minMax, setMinMax] = useState({ min: null, max: null });

  useEffect(() => {
    fetch("http://demo3389763.mockable.io/range-value")
      .then((response) => response.json())
      .then((data) => {
        if (data.minValue !== undefined && data.maxValue !== undefined) {
          setMinMax({ min: data.minValue, max: data.maxValue });
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Exercise 1</h1>
      {minMax.min !== null && minMax.max !== null && (
        <Range
          min={minMax.min}
          max={minMax.max}
          onChange={(values) => console.log("Valores actualizados:", values)}
        />
      )}
    </div>
  );
};

export default Exercise1;
