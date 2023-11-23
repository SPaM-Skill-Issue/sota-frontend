import { Column } from '@ant-design/plots';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { AudienceInterface, GenderValue, ResultForCountry, ResultForSport } from '../interfaces/audienceBarChart';
import { getSportName } from '../util/sportid';
import { getCountryName } from '../util/iso31661a2';
import { LegendCfg } from '@antv/g2/lib/interface';

interface BarChartProps {
    topic: string;
    filter: string;
    fetch_data: AudienceInterface[];
}

const BarChart: React.FC<BarChartProps> = ({ topic, filter, fetch_data }) => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [xFeild, setxField] = useState<string>('');
    const [data, setData] = useState<GenderValue[]>([]);

    function checkGender(data: GenderValue[]) {
        data.forEach((item) => {
            if (item.gender == "M") {
                item.gender = "Male";
            } else if (item.gender == "F") {
                item.gender = "Female";
            } else {
                item.gender = "Non defined";
            }
        });
    }

    function countBy(list: AudienceInterface[]) {
        if (topic == "sports") {
            setxField("country")
            const result: ResultForSport[] = [];
            list.forEach((item) => {
                if (item.sport_id.includes(Number(filter))) {
                    const country_name = getCountryName(item.country_code);
                    if ((result.filter((result_item) => result_item.country == country_name && result_item.gender == item.gender)).length == 0) {
                        const data: ResultForSport = {
                            country: country_name,
                            gender: item.gender,
                            value: 1
                        };
                        result.push(data);
                    }
                    else {
                        result.filter((result_item) => result_item.country == country_name && result_item.gender == item.gender)[0].value += 1;
                    }
                }
            });
            checkGender(result);
            setData(result);
        }
        else if (topic == "country") {
            setxField("sport")
            const result: ResultForCountry[] = [];
            list.forEach((item) => {
                if (item.country_code.includes(filter)) {
                    item.sport_id.forEach((id) => {
                        const sport_name = getSportName(String(id))
                        if ((result.filter((result_item) => { return result_item.sport == sport_name && result_item.gender == item.gender })).length == 0) {
                            const data: ResultForCountry = {
                                sport: sport_name,
                                gender: item.gender,
                                value: 1
                            };
                            result.push(data);
                        }
                        else {
                            result.filter((result_item) => result_item.sport == sport_name && result_item.gender == item.gender)[0].value += 1;
                        }
                    });
                }
            });
            checkGender(result);
            setData(result);
        }
    }


    useEffect(() => {
        setLoading(true);
        countBy(fetch_data);
        setLoading(false)
    }, [topic, filter, fetch_data]);

    const legendCfg: LegendCfg = {
        position: "bottom",
        itemName: {
            style: {
                fill: "#fff",
                fontFamily: "Noto Sans",
            },
        },
    }

    const config = {
        data,
        xField: xFeild,
        yField: "value",
        seriesField: 'gender',
        isGroup: true,
        legend: legendCfg,
        xAxis: {
            label: {
                style: {
                    fill: "#fff",
                    fontFamily: "Noto Sans",
                },
            },
        },
        yAxis: {
            label: {
                style: {
                    fill: "#fff",
                    fontFamily: "Noto Sans",
                },
            },
        },
    };

    return data.length == 0 ? (
        <div className="flex items-center justify-center w-full h-[75vh]">
            <span className='font-primary text-hunyadi-yellow text-3xl'>No DATA</span>
        </div>
    ) : (isLoading ? (
        <div className="flex items-center justify-center w-full h-[75vh]">
            <Spin size="large" />
        </div>
    ) : <Column {...config} />)
};

export default BarChart;
