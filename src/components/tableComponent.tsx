import { Table } from 'antd';

import React, { useEffect, useState } from 'react';
import Axios, { AxiosResponse } from 'axios';

type ColumnType = React.ReactElement<typeof Table.Column>;

export type TableRow<T> = {
    key: number
} & T;
export type DataProcessor<T> = (data: any) => TableRow<T>[];

export interface SotaTableProps<T> {
    src: string;
    containerClassName?: string;
    tableClassName?: string;
    columns?: ColumnType[];
    refreshRate?: number;
    dataProcess: DataProcessor<T>;
}

const SotaTable: React.FC<Partial<SotaTableProps<any>>> = (props) => {
    
    const [ isLoaded, setLoaded ] = useState<boolean>(false);
    const [ data, setData ] = useState<TableRow<any>[]>([]);

    const fetchData = async (): Promise<AxiosResponse> => {
        const res = await Axios.get(props.src!);
        console.log("Data fetched!");
        return res
    }

    const update = () => {
        fetchData().then((res) => {
            let rawData = res.data;
            console.log("Data processing...");
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
        <div className={props.containerClassName}>
            { isLoaded ?
                <Table dataSource={data} className={props.tableClassName} tableLayout="fixed" size="middle">
                    { props.columns?.map(col => col) }
                    { /*
                    <Table.Column key="gold" dataIndex="gold" title={
                        <MedalIcon place={1} size={24} fill="#D6AF36"/>
                    }/>
                    <Table.Column key="silver" dataIndex="silver" title={
                        <MedalIcon place={2} size={24} fill="#A7A7AD"/>
                    }/>
                    <Table.Column key="bronze" dataIndex="bronze" title={
                        <MedalIcon place={3} size={24} fill="#824A02"/>
                    }/>
                    */ }
                </Table>
            :
               <>Not Loaded</> 
            }
        </div>
    )
}

SotaTable.defaultProps = {
    containerClassName: "",
    tableClassName: "",
    columns: [],
    refreshRate: 30
}

export { SotaTable };