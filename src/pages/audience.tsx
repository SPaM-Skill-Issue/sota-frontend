import FilterComponent from "../components/filterSportCountry";
import PieChartComponent from "../components/pieChart";
import TotalAudienceNumber from "../components/totalAudienceNumber";

const audienceAgeData = [
    { type: '< 18', value: 27 },
    { type: '19-30', value: 25 },
    { type: '31-40', value: 18 },
    { type: '41-50', value: 10 },
    { type: '51-60', value: 3 },
    { type: '> 60', value: 3 },

];

const Audience = () => {
    return (
        <div>
            <div className="felx">
                <FilterComponent />
            </div>
            <div className="w-1/3 pt-10">
                <TotalAudienceNumber />
                <div className=" rounded-2xl bg-belft-blue mt-5">
                    <div className="p-5">
                        <span className=" font-primary text-2xl text-white">Audience Age Chart</span>
                        <PieChartComponent data={audienceAgeData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Audience;