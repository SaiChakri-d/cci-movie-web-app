import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { SearchMovies } from "../pages/SearchMovies";
import axios from "axios";
import { MemoryRouter } from "react-router";
import MovieModal from "../components/MovieModal";

jest.mock("axios");
jest.setTimeout(10000);

describe("SearchMovies component", () => {
  test("should render the search input and button", () => {
    render(<SearchMovies />);
    const searchInput = screen.getByPlaceholderText(
      "Enter the movie, series name"
    );
    const searchButton = screen.getByText("Search");
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test("should display error message when movie not found", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        Response: "False",
        totalResults: 0,
      },
    });

    render(<SearchMovies />);
    const searchInput = screen.getByPlaceholderText(
      "Enter the movie, series name"
    );
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "invalid_movie" } });
    act(() => fireEvent.click(searchButton));

    await waitFor(() => {
      const errorMessage = screen.queryByText(
        "Movie not found in the database!"
      );
      expect(errorMessage).not.toBeNull();
    });

    const errorMessage = screen.queryByText("Movie not found in the database!");
    expect(errorMessage).toBeInTheDocument();

    const errorNotice = screen.queryByTestId("error-message");
    expect(errorNotice).toBeInTheDocument();
  });

  test("should set isMovieNotFound state when no movies are found", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        Search: {
          Response: "False",
        },
        totalResults: 0,
      },
    });

    render(<SearchMovies />);
    const searchInput = screen.getByPlaceholderText(
      "Enter the movie, series name"
    );
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "invalid_movie" } });
    act(() => fireEvent.click(searchButton));

    await waitFor(() => {
      const errorMessage = screen.getByText("Movie not found in the database!");
      expect(errorMessage).toBeInTheDocument();
    });

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByTestId("error-message").textContent).toBe(
      "Movie not found in the database!"
    );

    expect(screen.queryByTestId("movie-card")).toBeNull();
    expect(screen.queryByTestId("pagination")).toBeNull();
    expect(screen.queryByTestId("error-modal")).toBeNull();
  });

  test("should display movie cards when search is successful", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        Search: [
          {
            Title: "Movie 1",
            Type: "movie",
            Year: "2021",
            Poster: "poster-1",
            imdbID: "id-1",
          },
        ],
        totalResults: 2,
      },
    });

    render(<SearchMovies />);
    const searchInput = screen.getByPlaceholderText(
      "Enter the movie, series name"
    );
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "batman" } });
    act(() => fireEvent.click(searchButton));

    await waitFor(() => {
      const movieCards = screen.getAllByRole("img", { name: /Movie/i });
      expect(movieCards).toHaveLength(1);
    });
  });

  test("should show more info modal when 'Show More Info' button is clicked", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        Search: [
          {
            Title: "Movie 1",
            Type: "movie",
            Year: "2021",
            Poster: "poster-1",
            imdbID: "id-1",
          },
        ],
        totalResults: 2,
      },
    });

    render(
      <MemoryRouter>
        <SearchMovies />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText(
      "Enter the movie, series name"
    );
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "movie" } });
    act(() => fireEvent.click(searchButton));

    await waitFor(() => screen.getByText("Movie 1"));

    const showMoreInfoButton = screen.getByTestId("show-more-info-id-1");
    act(() => fireEvent.click(showMoreInfoButton));

    const closeButton = screen.getByRole("button", { name: /X/i });
    act(() => fireEvent.click(closeButton));    
  });
});
