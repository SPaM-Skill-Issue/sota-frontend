import { Table, TableProps } from 'antd';

import React, { useEffect, useState } from 'react';
import Axios, { AxiosResponse } from 'axios';

type ColumnType = React.ReactElement<typeof Table.Column>;

export type TableRow<T> = {
    key: number
} & T;
export type DataProcessor<T> = (data: any) => TableRow<T>[];

export interface SotaTableProps<T> {
    src: string;
    columns?: ColumnType[];
    refreshRate?: number;
    tableProps?: Omit<TableProps<T>, "dataSource" | "loading">;
    dataProcess: DataProcessor<T>;
};

const SotaTable: React.FC<Partial<SotaTableProps<any>>> = (props) => {
    
    const [ isLoaded, setLoaded ] = useState<boolean>(false);
    const [ data, setData ] = useState<TableRow<any>[]>([]);

    const fetchData = async (): Promise<AxiosResponse> => {
        const res = await Axios.get(props.src!);
        return res
    }

    const update = () => {
        fetchData().then((res) => {
            let rawData = res.data;
            const finalData: TableRow<any>[] = props.dataProcess!.apply(null, [rawData]);
            setData(finalData);
            (finalData.length != 0 && !isLoaded) ? setLoaded(true) : false;
        });
    }

    useEffect(() => {
        setLoaded(false);
        update();
        const interval = setInterval(() => {
            update();
        }, props.refreshRate!*1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Table dataSource={data} loading={!isLoaded} {...props.tableProps}>
            { props.columns?.map(col => col) }
        </Table>
    );

};

SotaTable.defaultProps = {
    columns: [],
    refreshRate: 30
};

export { SotaTable };