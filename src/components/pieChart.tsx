import React from 'react';
import { Pie } from '@ant-design/plots';

const PieChartComponent: React.FC = () => {
  const data = [
    { type: 'Glod', value: 27 },
    { type: 'Silver', value: 25 },
    { type: 'Bronze', value: 18 },
  ];

  const config = {
    appendPadding: 10,
    data,
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
