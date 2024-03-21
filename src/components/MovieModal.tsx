import React from "react";
import { Dialog, Button } from "@mui/material";
import "../styles/MovieModal.css";

interface MovieModalProps {
  isOpen: boolean;
  movie: any;
  setCloseMod: (active: boolean) => void;
}

const MovieModal = ({ isOpen, movie, setCloseMod }: MovieModalProps) => {
  if (!isOpen || !movie.imdbID) return null;
  const handleClose = () => {
    setCloseMod(false);
  };

  return (
    <Dialog open={isOpen} fullWidth maxWidth="lg">
      <Button
        data-testid="modal-close-button"
        onClick={() => handleClose()}
        variant="contained"
        color="warning"
        size="small"
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
        }}
      >
        X
      </Button>
      <div className="movie-plot-pg">
        <img
          className="movie-img"
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x400"
          }
          alt={movie.Title}
        />
        <div className="plot-info">
          <h2 data-testid="modal-title">{movie.Title}</h2>
          <p>
            <strong>Type:</strong> {movie.Type}
          </p>
          <h4>IMDB Rating: ⭐{movie.imdbRating}</h4>
          <p>
            <strong>Rated:</strong> {movie.Rated}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>Released:</strong> {movie.Released}
          </p>
          <p>
            <strong>Genre:</strong> <em>{movie.Genre}</em>
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Writer:</strong> {movie.Writer}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p>
            <strong>Awards:</strong> {movie.Awards}
          </p>
          <p>
            <strong>Language:</strong> {movie.Language}
          </p>
          <p>
            <strong>Country:</strong> {movie.Country}
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default MovieModal;
