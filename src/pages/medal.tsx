import { ConfigProvider } from "antd";
import FilterSportCountry from "../components/filterSportCountry";
import PieChartComponent from "../components/pieChart";
import OverallMedalByCountry from "../components/tables/medalByCountry";
import { useEffect, useState } from 'react';
import { MedalTypeCount } from '../interfaces/medal'

const sportOrCountryData = [
    { type: 'Football', value: 27 },
    { type: 'Golf', value: 25 },
    { type: 'Archery', value: 18 },
    { type: 'Volleyball', value: 10 },
    { type: 'Swimming', value: 3 },
];

const Medal = () => {
    const [medalData, setMedal] = useState<MedalTypeCount | null>();
    const [load, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedal = async () => {
        try {
            const res = await fetch(`https://sota-backend.fly.dev/medals`);
            const data = await res.json();
            let k: keyof typeof data;
            let gold = 0;
            let silver = 0;
            let bronze = 0;
            for (k in data) {
                gold = gold + data[k].gold;
                silver = silver + data[k].silver;
                bronze = bronze + data[k].bronze;
            }
            const medalNew = [
                {type: 'gold', value: gold},
                {type: 'silver', value: silver},
                {type: 'bronze', value: bronze}
            ];
            setMedal(medalNew);
        } catch (error) {
            console.error("Error fetching overall medal data of every sport: ", error);
        } finally {
            setLoading(false);
        }};
        fetchMedal();
    }, []);

    return !load && (
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