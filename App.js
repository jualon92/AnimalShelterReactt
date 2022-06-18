import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParameters";
import Details from "./Details/Details";
import { StrictMode, useState } from "react";
import ThemeContext from "./ThemeContext";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const theme = useState("darkblue") //toma state como param ThemeContext
  return (
    <ThemeContext.Provider value={theme}> 
    <BrowserRouter>
    <header>
      <Link to="/">Adopt Me!</Link>
    </header>
    <Routes>
      <Route path="/details/:id" element={<Details />} />
      <Route path="/" element={<SearchParams />} />
    </Routes>
  </BrowserRouter>
  </ThemeContext.Provider>
  );
};

const root = createRoot(
  //creo root
  document.getElementById("root")
);
root.render(<App />); //render main app similar main java
