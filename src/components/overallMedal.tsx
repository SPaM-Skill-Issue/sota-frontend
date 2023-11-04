import MedalCountTable from "./medalCountTable";
import PieChartComponent from "./pieChart";
import { ArrowRightOutlined } from '@ant-design/icons';

const OverallMedal = () => {
    return (
        <div className="flex-row bg-belft-blue rounded-3xl">
            <div className="flex w-full p-5">
                <div>
                    <PieChartComponent />
                </div>
                <div className="w-full">
                    <div className=" flex justify-end">
                        <span className="font-primary text-hunyadi-yellow text-3xl">Overall Medal Count</span>
                    </div>
                    <div>
                        <MedalCountTable />
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