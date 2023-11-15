import BarChart from "../components/barChart";
import FilterComponent from "../components/filterSportCountry";
import PieChartComponent from "../components/pieChart";
import TotalAudienceNumber from "../components/totalAudienceNumber";
import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import SportsIcons from "../components/sportsIcons";
import { getSportName } from '../util/sportid';
import { getCountryName } from '../util/iso31661a2';
import { AudienceAgeRange } from "../interfaces/audiencePieChart";

const Audience = () => {
    const [ filterKey, setFilterKey ] = useState<string>('');
    const [ filterCatagory, setCatagory] = useState<string>('');
    const [ audienceData, setAudience ] = useState<AudienceAgeRange[] | null>();
    const [ load, setLoading ] = useState(true);

    useEffect(() => {
        const fetchMedal = async () => {
            try {
                const res = await fetch(`https://sota-backend.fly.dev/audient`);
                const data = await res.json();

                let audienceNew: AudienceAgeRange[] = [];
                audienceNew.push({ type: "< 18", value: 0});
                audienceNew.push({ type: "18-30", value: 0});
                audienceNew.push({ type: "31-40", value: 0});
                audienceNew.push({ type: "41-50", value: 0});
                audienceNew.push({ type: "51-60", value: 0});
                audienceNew.push({ type: "> 60", value: 0});

                
                for(var val of data) {
                    val['age'] < 18 ? audienceNew[0]['value'] += 1 : 
                    val['age'] < 30 ? audienceNew[1]['value'] += 1 : 
                    val['age'] < 40 ? audienceNew[2]['value'] += 1 : 
                    val['age'] < 50 ? audienceNew[3]['value'] += 1 : 
                    val['age'] < 60 ? audienceNew[4]['value'] += 1 : 
                    audienceNew[5]['value'] += 1;
                }
                
                setAudience(audienceNew);

                console.log(audienceNew);

            } catch (error) {
                console.error("Error fetching overall medal data of every sport: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedal();
    }, []);
    return (
        <div>
            <div>
                <FilterComponent dataHandle={setFilterKey} catagoryHandle={setCatagory} />
            </div>
            <div className="flex pt-10">
                <div className="w-1/3">
                    <TotalAudienceNumber />
                    <div className="rounded-2xl bg-belft-blue mt-5">
                        <div className="p-5">
                            <span className="font-primary text-2xl text-white">Audience Age Chart</span>
                            { !load && (
                                <PieChartComponent data={audienceData!} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="ml-5 bg-belft-blue rounded-2xl w-full">
                    <div className="p-5">
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
                        <div className='pt-5'>
                            <span className="font-primary text-white flex justify-center">Graph show numbers of people in {filterCatagory == "country" ? getCountryName(filterKey) :"each country" } that interested in {filterCatagory == "sports" ? getSportName(filterKey) :"each sports" }</span>
                            <div className=" pt-5">
                                <BarChart topic={ filterCatagory } filter={ filterKey }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Audience;