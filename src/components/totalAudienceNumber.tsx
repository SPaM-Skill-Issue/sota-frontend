import { ManOutlined, TeamOutlined, WomanOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AudienceInterface} from '../interfaces/audienceBarChart';
import { useState } from "react";
import { useEffect } from "react";
import { Spin } from "antd";

interface TotalAudience {
    total: number;
    man: number;
    woman: number;
    noneDefine: number;
}

interface TotalAudienceProps {
    fetch_data: AudienceInterface[];
}


const TotalAudienceNumber: React.FC<TotalAudienceProps> = ({ fetch_data }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<TotalAudience>();

    function count_aud(list: AudienceInterface[]) {
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
        setLoading(true);
        count_aud(fetch_data);
        setLoading(false);
    },[fetch_data]);

    return (
        <div className=" bg-belft-blue rounded-2xl">
            <div className=" p-5">
                <span className=" font-primary text-2xl text-white">Total Number of Audience</span>
                {isLoading ? 
                (<div className="flex items-center justify-center w-full h-[20vh]">
                    <Spin size="large" />
                </div>) : (data ?
                    (<><div className="flex justify-center py-5">
                        <span className=" text-hunyadi-yellow text-3xl">{data.total.toLocaleString()} <TeamOutlined /></span>
                    </div>
                        <div>
                            <div className="flex justify-center">
                                <span className="text-white"><ManOutlined /> {data.man.toLocaleString()}</span>
                                <span className="text-white ml-5"><WomanOutlined /> {data.woman.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-center">
                                <span className="text-white"><MinusCircleOutlined /> {data.noneDefine.toLocaleString()}</span>
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