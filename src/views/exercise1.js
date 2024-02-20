import React, { useState, useEffect } from "react";
import Range from "../components/range/range";
import "./exercise1.css";

const Exercise1 = () => {
  const [minMax, setMinMax] = useState({ min: null, max: null }); // Inicializado como null

  useEffect(() => {
    // Simulación de respuesta de la API
    const apiResponse = { min: 19, max: 1000 };
    setMinMax(apiResponse);
  }, []);

  // Renderizar el componente Range solo si min y max no son null
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
