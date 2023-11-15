import { ManOutlined, TeamOutlined, WomanOutlined } from "@ant-design/icons";
import { Audience, GenderValue, ResultForCountry, ResultForSport } from '../interfaces/audienceBarChart';
import { useState } from "react";
import { useEffect } from "react";

interface TotalAudienceNumberData {
    total: number;
    man: number;
    woman: number;
    noneDefine: number;
}

const data: TotalAudienceNumberData = {
    total: 2360000,
    man: 1000000,
    woman: 1000000,
    noneDefine: 360000,
}

const TotalAudienceNumber = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [data, setData] = useState<TotalAudienceNumberData>;

    useEffect(() => {
        const fetchData = async () => {
            setLoaded(true);
            try {
                const res_a = await fetch("https://sota-backend.fly.dev/audient")
                const audience_json:Audience[] = await res_a.json();
                const result: TotalAudienceNumberData = { total: 0, man: 0, woman: 0, noneDefine: 0 };
                audience_json.forEach(element => {
                    if()
                });
                let total_audience = audience_men + audience_woman + audience_unknow;
                console.log(audience_men, audience_woman, audience_unknow, total_audience)
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData()
    }, []);

    return (
        <div className=" bg-belft-blue rounded-2xl">
            <div className=" p-5">
                <span className=" font-primary text-2xl text-white">Total Number of Audient</span>
                <div className="flex justify-center py-5">
                    <span className=" text-hunyadi-yellow text-3xl">{data.total} <TeamOutlined /></span>
                </div>
                <div>
                    <div className="flex justify-center">
                        <span className="text-white"><ManOutlined /> {data.man}</span>
                        <span className="text-white ml-5"><WomanOutlined /> {data.woman}</span>
                    </div>
                    <div className="flex justify-center">
                        <span className="text-white"><ManOutlined /> {data.noneDefine}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TotalAudienceNumber;