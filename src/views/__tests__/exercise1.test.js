import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Exercise1 from "../exercise1";
import fetchMock from "jest-fetch-mock";

describe("Exercise1", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetches range values and renders the Range component", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ minValue: 10, maxValue: 50 }));

    const { getByText } = render(<Exercise1 />);

    await waitFor(() => {
      expect(getByText(/Exercise 1/i)).toBeInTheDocument();
    });
  });
});
