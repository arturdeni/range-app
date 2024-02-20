import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Range from "../range";

describe("Range Component", () => {
  test("renders correctly", () => {
    render(<Range min={0} max={100} onChange={() => {}} />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  test("updates minimum value correctly", () => {
    const onChange = jest.fn();
    render(<Range min={0} max={100} onChange={onChange} />);

    const minBullet = screen.getByTestId("min-bullet");
    fireEvent.mouseDown(minBullet, { clientX: 10 });
    fireEvent.mouseMove(minBullet, { clientX: 20 });
    fireEvent.mouseUp(minBullet);

    expect(onChange).toHaveBeenCalledWith(expect.anything());
  });

  test("updates maximum value correctly", () => {
    const onChange = jest.fn();
    render(<Range min={0} max={100} onChange={onChange} />);

    const maxBullet = screen.getByTestId("max-bullet");
    fireEvent.mouseDown(maxBullet, { clientX: 90 });
    fireEvent.mouseMove(maxBullet, { clientX: 80 });
    fireEvent.mouseUp(maxBullet);

    expect(onChange).toHaveBeenCalledWith(expect.anything());
  });
});
