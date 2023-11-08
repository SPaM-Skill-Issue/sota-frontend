import FilterSportCountry from "../components/filterSportCountry";
import PieChartComponent from "../components/pieChart";

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
                {/* TODO: Add overall medal table component */}
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