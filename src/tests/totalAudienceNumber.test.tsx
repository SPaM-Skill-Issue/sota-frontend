import { render, screen, waitFor } from "@testing-library/react";
import TotalAudienceNumber from "../components/totalAudienceNumber";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import {
  mockAudienceData,
  totalNumberOfAudient,
} from "./mocks/mockAudienceData";

describe('TotalAudienceNumber Component Tests', () => {
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

  test("displays loading state initially", async () => {
    render(<TotalAudienceNumber />);
    await waitFor(() => {
      const element = screen.getByText(/Total Number of Audient/i);
      expect(element).toBeInTheDocument();
    });
  });

  test("display total audience number correctly", async () => {
    render(
      <MemoryRouter>
        <TotalAudienceNumber />
      </MemoryRouter>
    );
    await waitFor(() => {
      const totalSpan = screen.getByTestId("total");
      expect(totalSpan).toHaveTextContent(String(totalNumberOfAudient["All"]));
      expect(totalSpan).toBeInTheDocument();
    });
  });

  test("display total male audience number correctly", async () => {
    render(
      <MemoryRouter>
        <TotalAudienceNumber />
      </MemoryRouter>
    );
    await waitFor(() => {
      const totalSpan = screen.getByTestId("total-m");
      expect(totalSpan).toHaveTextContent(String(totalNumberOfAudient["M"]));
      expect(totalSpan).toBeInTheDocument();
    });
  });

  test("display total female audience number correctly", async () => {
    render(
      <MemoryRouter>
        <TotalAudienceNumber />
      </MemoryRouter>
    );
    await waitFor(() => {
      const totalSpan = screen.getByTestId("total-f");
      expect(totalSpan).toHaveTextContent(String(totalNumberOfAudient["F"]));
      expect(totalSpan).toBeInTheDocument();
    });
  });

  test("display total not identify gender audience number correctly", async () => {
    render(
      <MemoryRouter>
        <TotalAudienceNumber />
      </MemoryRouter>
    );
    await waitFor(() => {
      const totalSpan = screen.getByTestId("total-n");
      expect(totalSpan).toHaveTextContent(String(totalNumberOfAudient["N"]));
      expect(totalSpan).toBeInTheDocument();
    });
  });
});
