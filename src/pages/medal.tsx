import { ConfigProvider } from "antd";
import FilterSportCountry from "../components/filterSportCountry";
import PieChartComponent from "../components/pieChart";
import OverallMedalByCountry from "../components/tables/medalByCountry";
import { useEffect, useState } from 'react';
import { MedalCount } from '../interfaces/medal'
import ReactCountryFlag from "react-country-flag";
import SportsIcons from "../components/sportsIcons";
import { getCountryName } from "../util/iso31661a2";
import { getSportName } from "../util/sportid";
import { Spin } from 'antd';
import MedalForSingleCountry from "../components/tables/medalForSingleCountry";
import MedalForSingleSport from "../components/tables/medalForSingleSport";

const Medal = () => {
    const [filterKey, setFilterKey] = useState<string>('');
    const [filterCatagory, setCatagory] = useState<string>('');
    const [medalData, setMedal] = useState<MedalCount[] | null>();
    const [sportOrCountryData, setSportOrCountryData] = useState<MedalCount[] | null>();
    const [load, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedal = async () => {
            try {
                const mockData: MedalCount[] = [];

                if (filterCatagory == '' || filterKey == '') {
                    setMedal(mockData);
                    setSportOrCountryData(mockData);
                    return;
                }
                const res = await fetch(`https://sota-backend.fly.dev/medal/${filterCatagory.charAt(0).toLowerCase()}/${filterKey}`);
                const data = await res.json();

                if (!data['gold'] && !data['silver'] && !data['bronze']) {
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

                const sportOrCountryNew: MedalCount[] = [];

                for (const val of data[`${filterCatagory == 'sports' ? 'individual_countries' : 'individual_sports'}`]) {
                    sportOrCountryNew.push({
                        type: val[filterCatagory == 'sports' ? 'country_name' : 'sport_name'],
                        value: val['bronze'] + val['silver'] + val['gold']
                    });
                }

                const itemsToSort = sportOrCountryNew.sort(
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

    return  (
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
                <div className="mt-6 scrollable-container h-fit max-h-[75vh] overflow-y-auto bg-belft-blue rounded-lg">
                    <div className="mt-5 ml-5">
                    {filterCatagory == "sports" ? 
                        (<div className="flex">
                            <div style={{ fill: "#DBA94D", width: 60 }} className="flex justify-center mr-2">
                                <SportsIcons sportId={Number(filterKey)} />
                            </div>
                            <div style={{ color: "#DBA94D" }} className="flex justify-center mb-5 mt-5">
                                <span className="font-primary text-3xl">{getSportName(filterKey)}</span>
                            </div>
                        </div>) 
                        : 
                        (<div className="flex">
                            <div style={{ width: 60 }} className="flex justify-center mr-2">
                                <ReactCountryFlag
                                    className='mx-3 mt-3 flex justify-center items-center'
                                    countryCode={filterKey}
                                    svg
                                    style={{
                                        width: '2.5em',
                                        height: '2.5em',
                                    }}
                                    title={filterKey}
                                />
                            </div>
                            <div style={{ color: "#DBA94D" }} className="flex justify-center mb-5 mt-5">
                                <span className="font-primary text-3xl">{getCountryName(filterKey)}</span>
                            </div>
                        </div>)}
                    </div>
                    <div className="flex justify-evenly">
                        { load ? (
                            <div className="flex justify-center h-full">
                                <Spin size="large"/>
                            </div> ) : 
                            ( medalData?.length != 0 ? (
                            <>
                                <div className="w-1/3 bg-belft-blue rounded-2xl mt-3">
                                    <div className="text-hunyadi-yellow text-2xl mt-7 font-primary justify-center"> Overall Medal </div>
                                    <PieChartComponent data={medalData!} />
                                </div>
                                <div className="w-1/3 bg-belft-blue rounded-2xl mt-3">
                                    <div className="text-hunyadi-yellow text-2xl mt-7 font-primary justify-center"> Medals from each {filterCatagory == 'sports' ? 'country' : 'sport'} </div>
                                    <PieChartComponent data={sportOrCountryData!} />
                                </div>
                            </>
                        ) : (<div className=" text-hunyadi-yellow text-3xl font-primary mt-7 flex">No medal data</div>))}
                    </div>
                    <div className="m-3">
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
        </div>
    );
}

export default Medal;