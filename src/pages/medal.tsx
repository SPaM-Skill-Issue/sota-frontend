import FilterSportCountry from "../components/filterSportCountry";
import MedalCountTable from "../components/medalCountTable";
import PieChartComponent from "../components/pieChart";

const Medal = () => {
  return (
    <div className="flex">
      <div className="w-1/3 overflow-auto">
        <MedalCountTable />
      </div>
      <div className="w-2/3 ml-4">
        <FilterSportCountry />
        <div className="flex justify-evenly h-fit">
          <div className="w-1/3">
            <PieChartComponent />
          </div>
          <div className="w-1/3">
            <PieChartComponent />
          </div>
        </div>
        <div>
          <MedalCountTable />
        </div>
      </div>
    </div>
  );
}

export default Medal;