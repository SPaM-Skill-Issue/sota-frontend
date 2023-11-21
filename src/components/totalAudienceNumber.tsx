import { ManOutlined, TeamOutlined, WomanOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Audience} from '../interfaces/audienceBarChart';
import { useState } from "react";
import { useEffect } from "react";
import { Spin } from "antd";

interface TotalAudience {
    total: number;
    man: number;
    woman: number;
    noneDefine: number;
}


const TotalAudienceNumber = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [data, setData] = useState<TotalAudience>();

    function count_aud(list: Audience[]) {
        const result: TotalAudience = { total: 0, man: 0, woman: 0, noneDefine: 0 };
        list.forEach(element => {
            result.total += 1
            if (element.gender == "M") {
                result.man += 1;
            }
            else if (element.gender == "F") {
                result.woman += 1;
            } else {
                result.noneDefine += 1;
            }
        });
        setData(result);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoaded(true);
            try {
                const res_a = await fetch("https://sota-backend.fly.dev/audient")
                const audience_json: Audience[] = await res_a.json();
                count_aud(audience_json);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
        setLoaded(false);
    },[]);

    return (
        <div className=" bg-belft-blue rounded-2xl">
            <div className=" p-5">
                <span className=" font-primary text-2xl text-white">Total Number of Audient</span>
                {isLoaded ? 
                (<div className="flex items-center justify-center w-full h-[20vh]">
                    <Spin size="large" />
                </div>) : (data ?
                    (<><div className="flex justify-center py-5">
                        <span data-testid="total" className=" text-hunyadi-yellow text-3xll">{data.total.toLocaleString()} <TeamOutlined /></span>
                    </div>
                        <div>
                            <div className="flex justify-center">
                                <span data-testid="total-m" className="text-white"><ManOutlined /> {data.man.toLocaleString()}</span>
                                <span data-testid="total-f" className="text-white ml-5"><WomanOutlined /> {data.woman.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-center">
                                <span data-testid="total-n" className="text-white"><MinusCircleOutlined /> {data.noneDefine.toLocaleString()}</span>
                            </div>
                        </div></>) :
                    (<div className="flex items-center justify-center w-full h-[20vh]">
                        <span className='font-primary text-hunyadi-yellow text-3xl'>No DATA</span>
                    </div>))}
            </div>
        </div>
    );
}

export default TotalAudienceNumber;