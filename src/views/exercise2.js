import React, { useState, useEffect } from "react";
import Range from "../components/range/range";

const Exercise2 = () => {
  const [minMax, setMinMax] = useState({ min: null, max: null });
  const [availableValues, setAvailableValues] = useState([]);

  useEffect(() => {
    fetch("http://demo3389763.mockable.io/range-value")
      .then((response) => response.json())
      .then((data) => {
        if (data.minValue !== undefined && data.maxValue !== undefined) {
          setMinMax({ min: data.minValue, max: data.maxValue });
        }
      })
      .catch((error) => {
        console.error("Error fetching min/max data: ", error);
      });

    fetch("http://demo3389763.mockable.io/range-available-values")
      .then((response) => response.json())
      .then((data) => {
        if (data.values && Array.isArray(data.values)) {
          setAvailableValues(data.values);
        }
      })
      .catch((error) => {
        console.error("Error fetching available values: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Exercise 2</h1>
      {minMax.min !== null && minMax.max !== null && (
        <Range
          min={minMax.min}
          max={minMax.max}
          availableValues={availableValues}
          onChange={(values) => console.log("Valores actualizados:", values)}
        />
      )}
    </div>
  );
};

export default Exercise2;
