import { ArrowRightOutlined } from "@ant-design/icons";
import SportsIcons from "./sportsIcons";
import SportCard from "./sportCard";
import { getSportName } from '../util/sportid';
import { Audience } from '../interfaces/audienceBarChart';
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";

interface topFiveSports {
    sportName: string;
    sportId: number;
    value: number;
    sportIcon: JSX.Element;
}

const MostInterestSports = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [data, setData] = useState<topFiveSports[]>([]);

    function count_interest_sport(list: Audience[]) {
        const allSports: topFiveSports[] = []
        list.forEach(element => {
            element.sport_id.forEach(id => {
                const sport_name = getSportName(String(id));
                if (allSports.filter((result_items => { return result_items.sportName == sport_name })).length == 0) {
                    const data: topFiveSports = {
                        sportName: sport_name,
                        sportId: id,
                        value: 1,
                        sportIcon: <SportsIcons sportId={id} />
                    };
                    allSports.push(data);
                } else {
                    allSports.filter(result_items => result_items.sportName == sport_name)[0].value += 1;
                }
            })
        })
        const result: topFiveSports[] = allSports.sort((a, b) => b.value - a.value).slice(0, 5)
        setData(result);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoaded(true);
            try {
                const res_a = await fetch("https://sota-backend.fly.dev/audient")
                const audience_json: Audience[] = await res_a.json();
                count_interest_sport(audience_json);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex-row bg-belft-blue rounded-3xl">
            <div className="flex-row w-full p-5">
                <div className=" flex justify-end">
                    <span className="font-primary text-hunyadi-yellow text-3xl">Top 5 sports with the most interest</span>
                </div>
                {!isLoaded ?
                    (<div className="flex items-center justify-center w-full h-[20vh]">
                        <Spin size="large" />
                    </div>) :
                    (< div className="flex justify-evenly w-full py-8">
                        {data.map((sport, index) => (
                            <Link key={index} to={`/sports/${sport.sportId}`}>
                                <SportCard key={index} sportName={sport.sportName} sportIcon={sport.sportIcon} color='#4C9F70' />
                            </Link>
                        ))
                        }
                    </div>)}
        </div>
            <div className="flex w-full justify-end pb-5 pr-5 text-white">
                <a href="/audience">Overall audience page <ArrowRightOutlined /></a>
            </div>
        </div >
    )
};

export default MostInterestSports;
