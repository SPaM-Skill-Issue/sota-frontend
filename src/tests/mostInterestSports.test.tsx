import { render, screen, waitFor } from "@testing-library/react";
import MostInterestSports from "../components/mostInterestSports";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import {
  mockAudienceData,
  topFiveSportNames,
} from "./mocks/mockAudienceData";

describe('MostInterestSports Component Tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockAudienceData),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders MostInterestSports component", async () => {
    render(
      <MemoryRouter>
        <MostInterestSports />
      </MemoryRouter>
    );
    await waitFor(() => {
      const element = screen.getByText(/Top 5 sports with the most interest/i);
      expect(element).toBeInTheDocument();
    });
  });

  test("displays top five sport correctly", async () => {
    render(
      <MemoryRouter>
        <MostInterestSports />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Check if each sport name from the topFiveSportNames is in the document.
      topFiveSportNames.forEach((sportName) => {
        expect(screen.getByText(sportName)).toBeInTheDocument();
      });
    });
  });

  test("Navigate to Overall audience page works correctly", async () => {
    render(
      <MemoryRouter>
        <MostInterestSports />
      </MemoryRouter>
    );

    await waitFor(() => {
      const element = screen.getByText(/Overall audience page/i);
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("href", "/audience");
    });
  });
});
