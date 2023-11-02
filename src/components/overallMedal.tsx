import PieChartComponent from "./pieChart";

const OverallMedal = () => {
    return (
        <div className="flex bg-belft-blue rounded-3xl">
            <div className="flex w-full p-5">
                <div className="">
                    <PieChartComponent />
                </div>
                <div className="w-full">
                    <div className=" flex justify-end">
                        <span className="font-primary text-hunyadi-yellow text-3xl">Overall Medal Count</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverallMedal;