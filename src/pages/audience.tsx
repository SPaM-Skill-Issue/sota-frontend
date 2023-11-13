import BarChart from "../components/barChart";
import FilterComponent from "../components/filterSportCountry";
import PieChartComponent from "../components/pieChart";
import TotalAudienceNumber from "../components/totalAudienceNumber";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import SportsIcons from "../components/sportsIcons";
import { getSportName } from '../util/sportid';
import { getCountryName } from '../util/iso31661a2';


const audienceAgeData = [
    { type: '< 18', value: 27 },
    { type: '19-30', value: 25 },
    { type: '31-40', value: 18 },
    { type: '41-50', value: 10 },
    { type: '51-60', value: 3 },
    { type: '> 60', value: 3 },

];



const Audience = () => {
    const [ filterKey, setFilterKey ] = useState<string>('');
    const [ filterCatagory, setCatagory] = useState<string>('');
    return (
        <div>
            <div className="felx">
                <FilterComponent dataHandle={setFilterKey} catagoryHandle={setCatagory} />
            </div>
            <div className="flex pt-10">
                <div className="w-1/3">
                    <TotalAudienceNumber />
                    <div className="rounded-2xl bg-belft-blue mt-5">
                        <div className="p-5">
                            <span className="font-primary text-2xl text-white">Audience Age Chart</span>
                            <PieChartComponent data={audienceAgeData} />
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