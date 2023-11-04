import FilterComponent from "../components/filterSportCountry";
import TotalAudienceNumber from "../components/totalAudienceNumber";

const Audience = () => {
    return (
        <div>
            <div className="felx">
                <FilterComponent />
            </div>
            <div className="w-1/3 pt-10">
                <TotalAudienceNumber />
            </div>
        </div>
    );
}

export default Audience;