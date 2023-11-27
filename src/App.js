import "./App.css";
import { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
// require('dotenv').config();

// db474f2

const OMDB_API_URL = process.env.REACT_APP_OMDB_API_URL
// const OMDB_API_URL = "http://www.omdbapi.com/?apikey=db474f2";

// const movie1 = {
//   Title: "Italian Spiderman",
//   Year: "2007",
//   imdbID: "tt2705436",
//   Type: "movie",
//   // "Poster": "N/A",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg",
// };

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${OMDB_API_URL}&s=${title}`);
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
