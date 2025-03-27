import React from "react";

import { QueryProvider } from "./containers/QueryProvider";
import { CocktailsGallery } from "./containers/CocktailsGallery";

function App() {
  return (
    <QueryProvider>
      <CocktailsGallery />
    </QueryProvider>
  );
}

export default App;
