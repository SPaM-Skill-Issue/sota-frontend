import { ConfigProvider } from "antd";
import FilterSportCountry from "../components/filterSportCountry";
import PieChartComponent from "../components/pieChart";
import OverallMedalByCountry from "../components/tables/medalByCountry";
import { useEffect, useState } from 'react';
import { MedalCount } from '../interfaces/medal'


const Medal = () => {
    const [filterKey, setFilterKey] = useState<string>('');
    const [filterCatagory, setCatagory] = useState<string>('');
    const [medalData, setMedal] = useState<MedalCount[] | null>();
    const [sportOrCountryData, setSportOrCountryData] = useState<MedalCount[] | null>();
    const [load, setLoading] = useState(true);

    const mockData: MedalCount[] = [];

    useEffect(() => {
        const fetchMedal = async () => {
            try {
                if (filterCatagory == '' || filterKey == '') {
                    setMedal(mockData);
                    setSportOrCountryData(mockData);
                    return;
                }
                const res = await fetch(`https://sota-backend.fly.dev/medal/${filterCatagory.charAt(0).toLowerCase()}/${filterKey}`);
                const data = await res.json();

                if (!data['gold']) {
                    setMedal(mockData);
                    setSportOrCountryData(mockData);
                    return;
                }

                const medalNew = [
                    { type: 'gold', value: data['gold'] },
                    { type: 'silver', value: data['silver'] },
                    { type: 'bronze', value: data['bronze'] }
                ]
                setMedal(medalNew);

                let sportOrCountryNew: MedalCount[] = [];

                for (var val of data[`${filterCatagory == 'sports' ? 'individual_countries' : 'individual_sports'}`]) {
                    sportOrCountryNew.push({
                        type: val[filterCatagory == 'sports' ? 'country_name' : 'sport_name'],
                        value: val['bronze'] + val['silver'] + val['gold']
                    });
                }

                let itemsToSort = sportOrCountryNew.sort(
                    (first, second) => (first['value'] > second['value'] ? -1 : 1)
                );

                const sortedSportOrCountry = itemsToSort.slice(0, 5);

                setSportOrCountryData(sortedSportOrCountry);


            } catch (error) {
                console.error("Error fetching overall medal data of every sport: ", error);
            } finally {
                setLoading(false);
            }
        };
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
                <FilterSportCountry dataHandle={setFilterKey} catagoryHandle={setCatagory} />
                <div className="flex justify-evenly h-fit">
                    { medalData?.length != 0 ? (
                        <>
                            <div className="w-1/3">
                                <PieChartComponent data={medalData!} />
                            </div>
                            <div className="w-1/3">
                                <PieChartComponent data={sportOrCountryData!} />
                            </div>
                        </>
                    ) : (<div className="w-1/3">No medal data lmao</div>)}
                </div>
                <div>
                    {/* TODO: Add medal by country and sport */}
                </div>
            </div>
        </div>
    );
}

export default Medal;