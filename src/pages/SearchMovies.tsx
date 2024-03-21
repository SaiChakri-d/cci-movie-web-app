import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import "../styles/SearchMovies.css";
import Pagination from "@mui/material/Pagination";
import MovieModal from "../components/MovieModal";

interface MovieInfo {
  Title: string;
  Type: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Error: any;

  imdbRating: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Awards: string;
  Language: string;
  Country: string;
}

export const SearchMovies = () => {
  const [movieData, setMovieData] = useState<MovieInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<any>(0);
  const [closeMod, setCloseMod] = useState<boolean>(false); //for MovieModal Open and Close actions 
  const [selectedMovie, setSelectedMovie] = useState<MovieInfo>(); //for showing more info onclick

  const [isMovieNotFound, setIsMovieNotFound] = useState<boolean>(false);

  const ITEMS_PER_PAGE = 10;
  let TotalResults: any = [];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(null);
      setIsMovieNotFound(false);

      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=9cc1e048&page=${currentPage}`
      );
      if (response.data && response.data.Search) {
        setMovieData(response.data.Search);
        console.log(response.data);

        TotalResults = parseInt(response.data.totalResults, 10);
        setTotalPages(Math.ceil(TotalResults / ITEMS_PER_PAGE));
        console.log(response.data.totalResults);

        if (TotalResults === 0) {
          setIsMovieNotFound(true);
        }
      } else {
        setTotalPages(0);
      }
      if (response.data.Search.Response === "False") {
        setIsError("Movie not found in the database!");
      }
    } catch (err) {
      setTotalPages(0);
      setIsError("Movie not found in the database!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (show === true) {
      fetchData();
    }
  }, [currentPage, show]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData();
    setShow(true);
  };

  const handleShowMoreInfo = async (imdbID: string) => {
    // setIsLoading(true);
    // setIsError(null);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=9cc1e048`
      );
      setSelectedMovie(response.data);
      setCloseMod(true);
    } 
    catch (error) {
      // setSelectedMovie(null);
      setIsError("Movie details not found!");
    }
  };

  return (
    <>
      <h1 className="page-title">Movie App</h1>
      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          // value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter the movie, series name"
          className="search-input"
        />

        <button className="search-btn" type="submit">
          Search
        </button>
      </form>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isError ? (
            <p data-testid="error-message" className="error-notice">
              Movie not found in the database!
            </p>
          ) : isMovieNotFound ? (
            <></>
          ) : (
            <>
              {show && movieData.length > 0 ? (
                <>
                  <div className="flex-container">
                    {movieData.map((movie, index: any) => (
                      <div key={index} className="movie-card">
                        <img
                          data-testid={`poster-${movie.Poster}`}
                          className="card-img"
                          src={
                            movie.Poster !== "N/A"
                              ? movie.Poster
                              : "https://placehold.co/300x400?text=Image+Not+Available!"
                          }
                          alt={movie.Title}
                        />
                        <div className="card-info">
                          <p>
                            <strong>Title: </strong>
                            {movie.Title}
                          </p>
                          <p>
                            <strong>Released: </strong>
                            {movie.Year}
                          </p>
                          <p>
                            <strong>Type: </strong> {movie.Type.toUpperCase()}
                          </p>
                        </div>
                        {movie.imdbID && (
                          <button
                            data-testid={`show-more-info-${movie.imdbID}`}
                            className="movie-card-btn"
                            onClick={() => handleShowMoreInfo(movie.imdbID)}
                          >
                            Show More Info
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* {isError && (
                    <p data-testid="error-modal">Movie details not found!</p>
                  )} */}
                  {closeMod && (
                    <MovieModal
                      isOpen={!!selectedMovie}
                      movie={selectedMovie}
                      setCloseMod={setCloseMod}
                    />
                  )}
                  <Pagination
                    data-testid="pagination"
                    className="pagination"
                    color="primary"
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
