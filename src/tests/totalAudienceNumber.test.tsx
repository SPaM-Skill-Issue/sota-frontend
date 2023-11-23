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

    it ("should render TotalAudienceNumber component correctly", () => {
        const TotalAudienceComponent = render(<TotalAudienceNumber />);
        expect(TotalAudienceComponent).toMatchSnapshot();
    });

    it ("should displays loading state initially", async () => {
        render(<TotalAudienceNumber />);
        await waitFor(() => {
            const element = screen.getByText(/Total Number of Audient/i);
            expect(element).toBeInTheDocument();
        });
    });

    it ("should display total audience number correctly", async () => {
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

    it ("should display total male audience number correctly", async () => {
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

    it ("should display total female audience number correctly", async () => {
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

    it ("should display total not identify gender audience number correctly", async () => {
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