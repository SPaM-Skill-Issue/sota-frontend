import BarChart from "../components/barChart";
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

const audienceGraphData = {
    xFeild: 'sport',
    yFeild: 'number of people',
    data: [
        { sport: 'Golf', value: 100 },
        { sport: 'Volleyball', value: 120 },
        { sport: 'Football', value: 90 },
        { sport: 'Archery', value: 150 },
    ]
}



const Audience = () => {
    return (
        <div>
            <div className="felx">
                <FilterComponent />
            </div>
            <div className="flex pt-10">
                <div className="w-1/3">
                    <TotalAudienceNumber />
                    <div className="rounded-2xl bg-belft-blue mt-5">
                        <div className="p-5">
                            <span className="font-primary text-2xl text-white">Audience Age Chart</span>
                            <PieChartComponent data={audienceAgeData} />
                        </div>
                    </div>
                </div>
                <div className="ml-5 bg-belft-blue rounded-2xl w-full">
                    <div className="p-5">
                        <span className="font-primary text-2xl text-white">Country or Sport name</span>
                        <div className="pt-5">
                            <span className="text-white flex justify-center">Graph show numbers of people in country that interested in each sports</span>
                            <div className=" pt-5">
                                <BarChart xFeild={ audienceGraphData.xFeild } yFeild={ audienceGraphData.yFeild } data={ audienceGraphData.data } />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Audience;