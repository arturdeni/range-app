import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Selecciona el nodo del DOM donde quieres montar la aplicación
const container = document.getElementById("root");

// Crea una raíz
const root = createRoot(container);

// Renderiza el componente App en la raíz
root.render(<App />);
