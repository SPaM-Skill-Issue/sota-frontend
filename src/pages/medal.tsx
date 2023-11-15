import { ConfigProvider } from "antd";
import FilterSportCountry from "../components/filterSportCountry";
import PieChartComponent from "../components/pieChart";
import OverallMedalByCountry from "../components/tables/medalByCountry";
import { useState } from "react";
import MedalForSingleCountry from "../components/tables/medalForSingleCountry";
import MedalForSingleSport from "../components/tables/medalForSingleSport";

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
    const [ filterKey, setFilterKey ] = useState<string>('');
    const [ filterCatagory, setCatagory ] = useState<string>('');
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
                <FilterSportCountry dataHandle={setFilterKey} catagoryHandle={setCatagory}/>
                <div className="mt-6 scrollable-container h-fit max-h-[75vh] overflow-y-auto bg-belft-blue rounded-lg">
                    <div className="flex justify-evenly h-fit">
                        <div className="w-1/3">
                            <PieChartComponent data={medalData} />
                        </div>
                        <div className="w-1/3">
                            <PieChartComponent data={sportOrCountryData} />
                        </div>
                    </div>
                    <ConfigProvider theme={{
                        components: {
                            Table: {
                                headerSplitColor: "rgba(0, 0, 0, 0)",
                                borderColor: "rgba(0, 0, 0, 0.4)",
                                headerBg: "#3E586C",
                            },
                        },
                        token: {
                            fontSize: 16,
                            colorBgContainer: "#3E586C"
                        },
                    }}>
                    <div>
                        { filterCatagory == "country" &&
                            <MedalForSingleCountry country={filterKey} />
                        }
                        { filterCatagory == "sports" &&
                            <MedalForSingleSport sport={parseInt(filterKey)} />
                        }
                    </div>
                    </ConfigProvider>
                </div>
            </div>
        </div>
    );
}

export default Medal;