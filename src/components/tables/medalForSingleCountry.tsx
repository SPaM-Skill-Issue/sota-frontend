import { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { SportEntry } from "../../interfaces/table";
import { SotaTable, SotaTableProps, TableRow } from "../tableComponent";
import MedalIcon from "../medalIcon";

const opts: Omit<SotaTableProps<SportEntry>, "src"> = {
    dataProcess: (data): TableRow<SportEntry>[] => {
        const sports: SportEntry[] = data["individual_sports"];
        sports.forEach((s) => {
            s.sub_sports.sort((a, b) => {
                if (a.total! < b.total!) return 1;
                if (a.total! > b.total!) return -1;
                if (a.gold! < b.gold!) return 1;
                if (a.gold! > b.gold!) return -1;
                if (a.silver! < b.silver!) return 1;
                if (a.silver! > b.silver!) return -1;
                return a.sub_name!.localeCompare(b.sub_name!) * -1;
            }),
            s.sub_sports.forEach((ss) => {
                ss.key = `${s.sport_id} - ${ss.sub_name}`,
                ss.name = ss.sub_name
                ss.total = ss.gold + ss.silver + ss.bronze
            });
        });
        sports.sort((a, b) => {
            if (a.total! < b.total!) return 1;
            if (a.total! > b.total!) return -1;
            if (a.gold! < b.gold!) return 1;
            if (a.gold! > b.gold!) return -1;
            if (a.silver! < b.silver!) return 1;
            if (a.silver! > b.silver!) return -1;
            return a.sport_name!.localeCompare(b.sport_name!) * -1;
        });
        let i: number = 0;
        const result: TableRow<SportEntry>[] = sports.map((e) => {
            const row: TableRow<SportEntry> = {
                ...e,
                key: `Sport ${e.sport_id!}`,
                rank: ++i,
                name: e.sport_name,
                children: e.sub_sports,
                total: e.gold + e.silver + e.bronze,
            };
            return row;
        }) || [];
        return result;
    },
    columns: [
        (<Table.Column key="rank" dataIndex="rank" render={(n) => n ? (
            <span className="font-bold font-primary text-hunyadi-yellow">#{n}</span>
        ) : (<></>)} width={80} />),
        (<Table.Column key="name" dataIndex="name" ellipsis={true} render={(s: string) => (
            <Tooltip className="font-primary" title={s} placement="left">
                {s}
            </Tooltip>
        )} />),
        (<Table.Column key="total" dataIndex="total" render={(t: number) => (
            <span className="font-bold">{t}</span>
        )} title={
            <span className="font-bold font-primary text-hunyadi-yellow">Total</span>
        } align="center" />),
        (<Table.Column key="gold" dataIndex="gold" title={
            <div className="flex w-full justify-center content-center">
                <MedalIcon place={1} size={32} fill="#D6AF36"/>
            </div>
        } align="center" />),
        (<Table.Column key="silver" dataIndex="silver" title={
            <div className="flex w-full justify-center content-center">
                <MedalIcon place={2} size={32} fill="#A7A7AD"/>
            </div>
        } align="center" />),
        (<Table.Column key="bronze" dataIndex="bronze" title={
            <div className="flex w-full justify-center content-center">
                <MedalIcon place={3} size={32} fill="#CC7B12"/>
            </div>
        } align="center" />),
    ],
    tableProps: {
        tableLayout: "fixed",
        pagination: false
    }
}

interface Props {
    country: string;
}

const MedalForSingleCountry: React.FC<Props> = (props) => { 

    const [ src, setSrc ] = useState<string>('');
    const [ loaded, setLoaded ] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(false);
        if (props.country == '') {
            setSrc('');
            return () => {};
        }
        setSrc(`https://sota-backend.fly.dev/medal/c/${props.country}`);
        setLoaded(true);
    }, [props.country]);

    return loaded ? (
        <SotaTable src={src} {...opts} />
    ) : (
        <></>
    );
};

export default MedalForSingleCountry;