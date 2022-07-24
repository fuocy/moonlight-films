import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieInfo from "./pages/Movie/MovieInfo";
import TVInfo from "./pages/TV/TVInfo";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="movie/:id" element={<MovieInfo />} />
      <Route path="tv/:id" element={<TVInfo />} />
    </Routes>
  );
}

export default App;
