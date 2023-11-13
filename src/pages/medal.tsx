import { ConfigProvider } from "antd";
import FilterSportCountry from "../components/filterSportCountry";
import PieChartComponent from "../components/pieChart";
import OverallMedalByCountry from "../components/tables/medalByCountry";
import { useEffect, useState } from 'react';
import { MedalTypeCount, MedalBySportCountry, MedalByKey } from '../interfaces/medal'
import SportCard from "../components/sportCard";


const Medal = () => {
    const [ filterKey, setFilterKey ] = useState<string>('');
    const [ filterCatagory, setCatagory ] = useState<string>('');
    const [ medalData, setMedal ] = useState<MedalTypeCount | null>();
    const [ sportOrCountryData, setSportOrCountryData ] = useState<MedalBySportCountry | null>();
    const [load, setLoading] = useState(true);

    const mockData = [{}];

    useEffect(() => {
        const fetchMedal = async () => {
        try {
            if(filterCatagory == '' || filterKey == '') {
                setMedal(mockData);
                setSportOrCountryData(mockData);
                return;
            }
            const res = await fetch(`https://sota-backend.fly.dev/medal/${filterCatagory.charAt(0).toLowerCase()}/${filterKey}`);
            const data = await res.json();

            console.log(data);

            const medalNew = [
                {type: 'gold', value: data['gold']},
                {type: 'silver', value: data['silver']},
                {type: 'bronze', value: data['bronze']}
            ];
            setMedal(medalNew);
            
            let sportOrCountryNew: Record<string, number>[] = [];
            
            for(var val of data['individual_countries']) {
                sportOrCountryNew.push({ type: val[filterCatagory == 'sports' ? 'country_name' : 'sport_name'], value: val['bronze'] + val['silver'] + val['gold']});
            }

            let itemsToSort = Object.keys(sportOrCountryNew).map(
                (key) => { return [key, sportOrCountryNew[key]] }
            );
            itemsToSort.sort(
                (first, second) => { return second[1]['value'] - first[1]['value'] }
            );

            const sortedSportOrCountry = itemsToSort.slice(0, 5);
            
            let sportOrCountryResult: Record<string, number>[] = [];
            sortedSportOrCountry.forEach((sorted) => { sportOrCountryResult.push({ type: sorted[1]['type'], value: sorted[1]['value']}) });

            setSportOrCountryData(sportOrCountryResult);

            
        } catch (error) {
            console.error("Error fetching overall medal data of every sport: ", error);
        } finally {
            setLoading(false);
        }};
        fetchMedal();
    }, [filterCatagory, filterKey]);

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
                <FilterSportCountry dataHandle={setFilterKey} catagoryHandle={setCatagory}/>
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