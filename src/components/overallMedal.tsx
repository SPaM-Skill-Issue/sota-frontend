import PieChartComponent from "./pieChart";
import { ConfigProvider } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';
import MedalTable from "./tables/medalByCountry";

const data = [
    { type: 'Glod', value: 27 },
    { type: 'Silver', value: 25 },
    { type: 'Bronze', value: 18 },
];

const OverallMedal = () => {
    return (
        <div className="flex-row bg-belft-blue rounded-3xl">
            <div className="flex w-full p-5">
                <div>
                    <PieChartComponent data={data} />
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