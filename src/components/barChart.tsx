import { Column } from '@ant-design/plots';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Audience, GenderValue, ResultForCountry, ResultForSport } from '../interfaces/audienceBarChart';
import { getSportName } from '../util/sportid';
import { getCountryName } from '../util/iso31661a2';

interface BarChartProps {
    topic: string;
    filter: string;
}

const BarChart: React.FC<BarChartProps> = ({ topic, filter }) => {

    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [xFeild, setxField] = useState<string>('');
    const [data, setData] = useState<GenderValue[]>([]);

    function checkGender(gender: string) {
        if(gender == "M"){
            return "Male";
        } else if (gender == "F"){
            return "Female";
        }
        return "Non defined"
    }

    function countBy(list: Audience[]) {
        if (topic == "sports") {
            setxField("country")
            const result: ResultForSport[] = [];
            list.forEach((item) => {
                if (item.sport_id.includes(Number(filter))) {
                    if ((result.filter((result_item) => result_item.country == item.country_code && result_item.gender == item.gender)).length == 0) {
                        const data: ResultForSport = {
                            country: getCountryName(item.country_code),
                            gender: checkGender(item.gender),
                            value: 1
                        };
                        result.push(data);
                    }
                    else {
                        result.filter((result_item) => result_item.country == item.country_code && result_item.gender == item.gender)[0].value += 1;
                    }
                }
            });
            setData(result);
        }
        else if (topic == "country") {
            setxField("sport")
            const result: ResultForCountry[] = [];
            list.forEach((item) => {
                if (item.country_code.includes(filter)) {
                    item.sport_id.forEach((id) => {
                        if ((result.filter((result_item) => result_item.sport == String(id) && result_item.gender == item.gender)).length == 0) {
                            const data: ResultForCountry = {
                                sport: getSportName(String(id)),
                                gender: checkGender(item.gender),
                                value: 1
                            };
                            result.push(data);
                        }
                        else {
                            result.filter((result_item) => result_item.sport == String(id) && result_item.gender == item.gender)[0].value += 1;
                        }
                    });
                }
            });
            setData(result);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            setLoaded(true);
            try {
                const res_a = await fetch("https://sota-backend.fly.dev/audient");
                const audience_json = await res_a.json();
                countBy(audience_json);

            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoaded(false);
            }
        };
        fetchData();
    }, [topic, filter]);

    const config = {
        data,
        xField: xFeild,
        yField: "value",
        seriesField: 'gender',
        isGroup: true,
    }

    return isLoaded ? (
        <div className="flex items-center justify-center w-screen h-[75vh]">
            <Spin size="large" />
        </div>
    ) : <Column {...config} />;
};

export default BarChart;
