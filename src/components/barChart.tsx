import { Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { Audience, GenderValue, ResultForCountry, ResultForSport } from '../interfaces/audienceBarChart';


interface BarChartProps {
    topic: string;
    filter: string;
}

const BarChart: React.FC<BarChartProps> = ({ topic, filter }) => {

    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [xFeild, setxField] = useState<string>('');
    const [data, setData] = useState<GenderValue[]>([]);

    function countBy(list: Audience[]) {
        if (topic == "sport") {
            setxField("country")
            const result: ResultForSport[] = [];
            list.forEach((item) => {
                if (item.sport_id.includes(Number(filter))) {
                    if ((result.filter((result_item) => result_item.country == item.country_code && result_item.gender == item.gender)).length == 0) {
                        const data: ResultForSport = {
                            country: item.country_code,
                            gender: item.gender,
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
                                sport: String(id),
                                gender: item.gender,
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
                const res = await fetch("https://sota-backend.fly.dev/audient");
                const j = await res.json();
                countBy(j);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoaded(false);
            }
        };
        fetchData();
    }, []);

    const config = {
        data,
        xField: xFeild,
        yField: "value",
        seriesField: 'gender',
        isGroup: true,
    }

    return <Column {...config} />;
};

export default BarChart;
