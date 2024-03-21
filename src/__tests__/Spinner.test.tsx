import React from "react";
import { render } from "@testing-library/react";
import Spinner from "../components/Spinner";

describe("Spinner component", () => {
  test("should render the spinner image", () => {
    const { getByAltText } = render(<Spinner />);
    const spinnerImage = getByAltText("Loading...");
    expect(spinnerImage).toBeInTheDocument();
    expect(spinnerImage.getAttribute("src")).toContain("spinner.svg");
  });
});
