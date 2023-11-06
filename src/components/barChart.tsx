import { Bar } from '@ant-design/plots';
import React from 'react';

interface BarChartProps {
    xFeild: string;
    yFeild: string;
    data: {
        sport: string;
        value: number;
    }[];
}

const BarChart: React.FC<BarChartProps> = ({ xFeild, yFeild, data }) => {

    const config = {
        data,
        xField: xFeild,
        yField: yFeild,
    };

    return <Bar {...config} />;
};

export default BarChart;
