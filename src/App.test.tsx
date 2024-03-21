import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("Checks the ClassName in App component", () => {
    render(<App />);
    const linkElement = screen.getByText(/Movie App/i);
    expect(linkElement).toBeInTheDocument();
  });
});
