import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Exercise2 from "../exercise2";
import fetchMock from "jest-fetch-mock";

describe("Exercise2", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetches range values and available values, then renders the Range component", async () => {
    fetchMock.mockResponses(
      [JSON.stringify({ minValue: 10, maxValue: 50 }), { status: 200 }],
      [JSON.stringify({ values: [10, 20, 30, 40, 50] }), { status: 200 }]
    );

    const { getByText } = render(<Exercise2 />);

    await waitFor(() => {
      expect(getByText(/Exercise 2/i)).toBeInTheDocument();
    });
  });
});
