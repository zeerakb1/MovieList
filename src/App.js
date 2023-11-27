import "./App.css";
import { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const OMDB_API_URL = 'http://www.omdbapi.com/'
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY


function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);

    console.log(data.Search);
  };

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  return (
    <div className="app">
      <h1>Movies List</h1>

      <div className="search">
        <input
          placeholder="Search Movie Database"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search_icon"
          onClick={() => searchMovies(title)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
