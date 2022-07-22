import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieInfo from "./pages/Movie/MovieInfo";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="movie/:id" element={<MovieInfo />} />
    </Routes>
  );
}

export default App;
