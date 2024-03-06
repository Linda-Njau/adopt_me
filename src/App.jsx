import { useState } from 'react';
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import SearchParams from "./SearchParams";
import AdoptedPetContext from './AdoptedPetContext';
import Details from "./Details";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <h1>Adopt me!</h1>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
