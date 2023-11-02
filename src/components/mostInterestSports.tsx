import { ArrowRightOutlined } from "@ant-design/icons";
import { Archery, ArtisticGymnastics } from "../assets/sportsPictogram";
import SportCard from "./sportCard";

const topFiveSports = [
    {
        sportName: "Archery",
        sportIcon: <Archery />
    },
    {
        sportName: "Artistic Gymnastics",
        sportIcon: <ArtisticGymnastics />
    },
    {
        sportName: "Athletics",
        sportIcon: <Archery />
    },
    {
        sportName: "Badminton",
        sportIcon: <ArtisticGymnastics />
    },
    {
        sportName: "Baseball",
        sportIcon: <Archery />
    }
];

const MostInterestSports = () => {
    return (
        <div className="flex-row bg-belft-blue rounded-3xl">
            <div className="flex-row w-full p-5">
                <div className=" flex justify-end">
                    <span className="font-primary text-hunyadi-yellow text-3xl">Top 5 sports with the most interest</span>
                </div>
                <div className="flex justify-evenly w-full py-8">
                    { topFiveSports.map((sport, index) => (
                            <SportCard key={index} sportName={sport.sportName} sportIcon={sport.sportIcon} color='#4C9F70' />
                        ))
                    }
                </div>
            </div>
            <div className="flex w-full justify-end pb-5 pr-5 text-white">
                <a href="/medal">Overall audience page<ArrowRightOutlined /></a>
            </div>
        </div>
    )
};

export default MostInterestSports;
