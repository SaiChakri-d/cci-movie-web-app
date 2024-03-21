import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchMovies } from "./pages/SearchMovies";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchMovies />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
