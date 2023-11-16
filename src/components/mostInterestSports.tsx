import { ArrowRightOutlined } from "@ant-design/icons";
import SportsIcons from "./sportsIcons";
import SportCard from "./sportCard";
import { getSportName } from '../util/sportid';
import { Audience} from '../interfaces/audienceBarChart';
import { useState } from "react";
import { useEffect } from "react";

const topFiveSports = [
    {
        sportName: "Archery",
        sportIcon: <SportsIcons sportId={1} />
    },
    {
        sportName: "Artistic Gymnastics",
        sportIcon: <SportsIcons sportId={2} />
    },
    {
        sportName: "Artistic Swimming",
        sportIcon: <SportsIcons sportId={3} />
    },
    {
        sportName: "Athletics",
        sportIcon: <SportsIcons sportId={4} />
    },
    {
        sportName: "Badminton",
        sportIcon: <SportsIcons sportId={5} />
    }
];

interface topFiveSports{
    sportsName:string;
    value:number;
}

const MostInterestSports = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [data, setData] = useState<topFiveSports[]>([]);

    function count_interest_sport(list: Audience[]) {
        const result :topFiveSports[] = []
        list.forEach(element => {
            element.sport_id.forEach(id => {
                const sport_name = getSportName(String(id));
                if(result.filter((result_items =>{return result_items.sportsName == sport_name})).length==0){
                    const data: topFiveSports ={
                        sportsName: sport_name,
                        value:1
                    };
                    result.push(data);
                } else {
                    result.filter(result_items => result_items.sportsName == sport_name)[0].value+=1;
                }
            })
        })
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
        setLoaded(false)
    });

    return (
        <div className="flex-row bg-belft-blue rounded-3xl">
            <div className="flex-row w-full p-5">
                <div className=" flex justify-end">
                    <span className="font-primary text-hunyadi-yellow text-3xl">Top 5 sports with the most interest</span>
                </div>
                <div className="flex justify-evenly w-full py-8">
                    {topFiveSports.map((sport, index) => (
                        <SportCard key={index} sportName={sport.sportName} sportIcon={sport.sportIcon} color='#4C9F70' />
                    ))
                    }
                </div>
            </div>
            <div className="flex w-full justify-end pb-5 pr-5 text-white">
                <a href="/audience">Overall audience page <ArrowRightOutlined /></a>
            </div>
        </div>
    )
};

export default MostInterestSports;
