import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import MovieModal from "../components/MovieModal";

describe("MovieModal component", () => {
  const mockMovie = {
    Title: "Movie 1",
    Year: "2021",
    imdbID: "id-1",
    Type: "movie",
    Poster: "poster-url-1",
    imdbRating: "7.5",
    Rated: "PG-13",
    Released: "2021-01-01",
    Runtime: "120 min",
    Genre: "Action",
    Director: "John Doe",
    Writer: "Jane Smith",
    Actors: "Actor 1, Actor 2",
    Plot: "Plot summary",
    Awards: "Best Movie",
    Language: "English",
    Country: "USA",
  };
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should not render when isOpen is false", () => {
    render(
      <MovieModal isOpen={false} movie={mockMovie} setCloseMod={onCloseMock} />
    );
    const movieModal = screen.queryByText("Movie 1");
    expect(movieModal).not.toBeInTheDocument();
  });

  test("should not render when movie.imdbID is falsy", () => {
    render(
      <MovieModal
        isOpen={true}
        movie={{ ...mockMovie, imdbID: "" }}
        setCloseMod={onCloseMock}
      />
    );
    const movieModal = screen.queryByText("Movie 1");
    expect(movieModal).not.toBeInTheDocument();
  });

  test("should render the movie details when isOpen is true and movie.imdbID is truthy", () => {
    render(
      <MovieModal isOpen={true} movie={mockMovie} setCloseMod={onCloseMock} />
    );
    const movieTitle = screen.getByText("Movie 1");
    const movieRating = screen.getByText("IMDB Rating: ⭐7.5");
    expect(movieTitle).toBeInTheDocument();
    expect(movieRating).toBeInTheDocument();
  });

  test("should call onClose when the close button is clicked", () => {
    render(
      <MovieModal isOpen={true} movie={mockMovie} setCloseMod={onCloseMock} />
    );
    const closeButton = screen.getByText("X");
    act(() => fireEvent.click(closeButton));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
