import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: number;
    rank?: number;
    country: string;
    total: number;
    gold: number;
    silver: number;
    bronze: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'rank',
        dataIndex: 'rank',
        key: 'rank',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'Gold',
        dataIndex: 'gold',
        key: 'gold',
    },
    {
        title: 'Silver',
        dataIndex: 'silver',
        key: 'silver',
    },
    {
        title: 'Bronze',
        dataIndex: 'bronze',
        key: 'bronze',
    },
];

const data: DataType[] = [
    {
        key: 1,
        rank: 1,
        country: 'United States',
        total: 113,
        gold: 39,
        silver: 41,
        bronze: 33,
    },
    {
        key: 2,
        rank: 2,
        country: 'China',
        total: 88,
        gold: 38,
        silver: 32,
        bronze: 18,
    },
    {
        key: 3,
        rank: 3,
        country: 'Japan',
        total: 58,
        gold: 27,
        silver: 14,
        bronze: 17,
    }
];

const MedalCountTable = () => {
    return <Table columns={columns} dataSource={data} />
}

export default MedalCountTable;