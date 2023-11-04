import { ManOutlined, TeamOutlined, WomanOutlined } from "@ant-design/icons";

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

    return (
        <div className=" bg-belft-blue rounded-2xl">
            <div className=" p-5">
                <span className=" font-primary text-2xl text-white">Total Number of Audient</span>
                <div className="flex justify-center py-5">
                    <span className=" text-hunyadi-yellow text-3xl">{ data.total } <TeamOutlined /></span>
                </div>
                <div>
                    <div className="flex justify-center">
                        <span className="text-white"><ManOutlined /> { data.man }</span>
                        <span className="text-white ml-5"><WomanOutlined /> {data.woman}</span>
                    </div>
                    <div className="flex justify-center">
                        <span className="text-white"><ManOutlined /> { data.noneDefine }</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TotalAudienceNumber;