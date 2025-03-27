import React from "react";

import { QueryProvider } from "./containers/QueryProvider";
import { CocktailsGallery } from "./containers/CocktailsGallery";
import "./App.css";

function App() {
  return (
    <QueryProvider>
      <CocktailsGallery />
    </QueryProvider>
  );
}

export default App;
