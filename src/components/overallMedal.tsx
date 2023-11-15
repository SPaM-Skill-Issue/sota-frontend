import PieChartComponent from "./pieChart";
import { ConfigProvider } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';
import MedalTable from "./tables/medalByCountryHomePage";
import { MedalCount } from "../interfaces/medal";
import { useState, useEffect } from "react";

const OverallMedal = () => {
    const [medalData, setMedal] = useState<MedalCount[] | null>();
    const [load, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedal = async () => {
            try {
                const res = await fetch(`https://sota-backend.fly.dev/medals`);
                const data = await res.json();
                
                let key: keyof typeof data;
                let gold: number = 0;
                let silver: number = 0;
                let bronze: number = 0;

                for (key in data) {
                    gold += data[key]['gold'];
                    silver += data[key]['silver'];
                    bronze += data[key]['bronze'];
                }

                let countryMedalsNew: MedalCount[] = [];
                countryMedalsNew.push({ type: 'gold', value: gold });
                countryMedalsNew.push({ type: 'silver', value: silver });
                countryMedalsNew.push({ type: 'bronze', value: bronze });

                setMedal(countryMedalsNew);

            } catch (error) {
                console.error("Error fetching overall medal data of every sport: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedal();
    });
    return (
        <div className="flex-row bg-belft-blue rounded-3xl">
            <div className="flex w-full p-5">
                <div className="flex justify-center">
                    { !load && (
                        <PieChartComponent data={medalData!} />
                    )}
                </div>
                <div className="w-full">
                    <div className=" flex justify-end">
                        <span className="font-primary text-hunyadi-yellow text-3xl">Overall Medal Count</span>
                    </div>
                    <div className="pt-6">
                    <ConfigProvider
                        theme = {{
                            components: {
                                Table: {
                                    headerBg: "rgba(0, 0, 0, 0)",
                                    headerSplitColor: "rgba(0, 0, 0, 0)",
                                    borderColor: "rgba(0, 0, 0, 0)"
                                },
                            },
                            token: {
                                colorBgContainer: "rgba(0, 0, 0, 0)",
                                colorFillAlter: "#3E586C",
                                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
                            }
                        }}
                    >
                        <MedalTable />
                    </ConfigProvider>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-end p-5 text-white">
                <a href="/medal">Overall medal page <ArrowRightOutlined /></a>
            </div>
        </div>
    );
}

export default OverallMedal;