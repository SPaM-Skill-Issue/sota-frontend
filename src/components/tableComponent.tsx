/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table, TableProps } from 'antd';

import React, { useEffect, useState } from 'react';

type ColumnType = React.ReactElement<typeof Table.Column>;

export type TableRow<T> = {
    key: number | string,
    children?: object[] | undefined
} & T;
export type DataProcessor<T> = (data: any) => TableRow<T>[];

export interface SotaTableProps<T> {
    src: string;
    columns?: ColumnType[];
    refreshRate?: number;
    tableProps?: Omit<TableProps<T>, "dataSource" | "loading">;
    seamless?: boolean;
    dataProcess: DataProcessor<T>;
}

const SotaTable: React.FC<Partial<SotaTableProps<any>>> = (props) => {

    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [data, setData] = useState<TableRow<any>[]>([]);

    const fetchData = async (): Promise<any> => {
        const res = await fetch(props.src!);
        const j = await res.json();
        return j;
    }

    const update = () => {
        if (!props.seamless) setLoaded(false);
        fetchData().then((res) => {
            const data: TableRow<any>[] = props.dataProcess!.apply(null, [res]);
            setData(data);
            setLoaded(true);
        });
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        setLoaded(false);
    }, []);

    useEffect(() => {
        update();
        const interval = setInterval(() => {
            update();
        }, props.refreshRate! * 1000);
        return () => clearInterval(interval);
    }, [props.src]);
    /* eslint-enable */

    return (
        <Table dataSource={data} loading={!isLoaded} {...props.tableProps}>
            {props.columns?.map(col => col)}
        </Table>
    );

};

SotaTable.defaultProps = {
    columns: [],
    refreshRate: 60,
    seamless: true
};

export { SotaTable };