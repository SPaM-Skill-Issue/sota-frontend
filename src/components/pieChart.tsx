import React from 'react';
import { Pie } from '@ant-design/plots';

interface PieChartComponentProps {
    data: {
        type: string;
        value: number;
    }[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {

    const config = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{percentage}',
        },
        interactions: [{ type: 'element-active' }],
    };

    return <Pie {...config} />;
};

export default PieChartComponent;
