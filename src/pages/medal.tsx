import { ConfigProvider } from "antd";
import FilterSportCountry from "../components/filterSportCountry";
import PieChartComponent from "../components/pieChart";
import OverallMedalByCountry from "../components/tables/medalByCountry";

const medalData = [
    { type: 'Glod', value: 27 },
    { type: 'Silver', value: 25 },
    { type: 'Bronze', value: 18 },
];

const sportOrCountryData = [
    { type: 'Football', value: 27 },
    { type: 'Golf', value: 25 },
    { type: 'Archery', value: 18 },
    { type: 'Volleyball', value: 10 },
    { type: 'Swimming', value: 3 },
];

const Medal = () => {
    return (
        <div className="flex">
            <div className="w-1/3 overflow-auto">
                <ConfigProvider theme={{
                    components: {
                        Table: {
                            headerSplitColor: "rgba(0, 0, 0, 0)",
                            borderColor: "rgba(0, 0, 0, 0)",
                            headerBg: "#213555",
                        },
                    },
                    token: {
                        fontSize: 16,
                        colorFillAlter: "#3E586C",
                        colorBgContainer: "#213555"
                    },
                }}>
                <OverallMedalByCountry />
                </ConfigProvider>
            </div>
            <div className="w-2/3 ml-4">
                <FilterSportCountry />
                <div className="flex justify-evenly h-fit">
                    <div className="w-1/3">
                        <PieChartComponent data={medalData} />
                    </div>
                    <div className="w-1/3">
                        <PieChartComponent data={sportOrCountryData} />
                    </div>
                </div>
                <div>
                    {/* TODO: Add medal by country and sport */}
                </div>
            </div>
        </div>
    );
}

export default Medal;