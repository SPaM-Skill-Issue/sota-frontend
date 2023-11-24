import { render, screen, waitFor } from "@testing-library/react";
import TotalAudienceNumber from "../components/totalAudienceNumber";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import {
    mockAudienceData,
    totalNumberOfAudient,
} from "./mocks/mockAudienceData";

describe('TotalAudienceNumber Component Tests', () => {
    it ("should render TotalAudienceNumber component correctly", () => {
        const wrapper = render(<TotalAudienceNumber fetch_data={[]} />);
        expect(wrapper).toMatchSnapshot();
    });

    it ("should displays loading state initially", async () => {
        render(<TotalAudienceNumber fetch_data={mockAudienceData} />);
        await waitFor(() => {
            const element = screen.getByText(/Total Number of Audience/i);
            expect(element).toBeInTheDocument();
        });
    });

    it ("should display total audience number correctly", async () => {
        render(
            <MemoryRouter>
                <TotalAudienceNumber fetch_data={mockAudienceData} />
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
                <TotalAudienceNumber fetch_data={mockAudienceData} />
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
                <TotalAudienceNumber fetch_data={mockAudienceData} />
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
                <TotalAudienceNumber fetch_data={mockAudienceData} />
            </MemoryRouter>
        );
        await waitFor(() => {
            const totalSpan = screen.getByTestId("total-n");
            expect(totalSpan).toHaveTextContent(String(totalNumberOfAudient["N"]));
            expect(totalSpan).toBeInTheDocument();
        });
    });
});