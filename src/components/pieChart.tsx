import React from 'react';
import { Pie } from '@ant-design/plots';
import { MedalCount } from '../interfaces/medal';
import { LegendCfg } from '@antv/g2/lib/interface';

interface PieChartComponentProps {
    data: MedalCount[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {

    const legendCfg: LegendCfg = {
        itemName: {
            style: {
                fill: "#fff",
                fontFamily: "Noto Sans",
            },
        },
    }

    const config = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        legend: legendCfg,
        label: {
            type: 'outer',
            content: '{percentage}',
            style: {
                fill: "#fff",
                fontFamily: "Noto Sans"
            }
        },
        interactions: [{ type: 'element-active' }],
    };

    return <Pie {...config} />;
};

export default PieChartComponent;
