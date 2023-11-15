import { useState, useEffect } from "react";
import { SotaTable, SotaTableProps, TableRow } from "../tableComponent";
import { CountryEntry } from "../../interfaces/table";
import { Table, Tooltip } from "antd";
import ReactCountryFlag from "react-country-flag";
import { getCountryName } from "../../util/iso31661a2";
import MedalIcon from "../medalIcon";

const opts: Omit<SotaTableProps<CountryEntry>, "src"> = {
    dataProcess: (data): TableRow<CountryEntry>[] => {
        const result: TableRow<CountryEntry>[] = [];
        const countries: CountryEntry[] = data["individual_countries"] || [];
        countries.forEach(e => {
            result.push({
                key: 0,
                rank: 0,
                country: e.country_code,
                total: e.gold + e.silver + e.bronze,
                gold: e.gold,
                silver: e.silver,
                bronze: e.bronze
            });
        });
        result.sort((a: Partial<CountryEntry>, b: Partial<CountryEntry>) => {
            if (a.total! < b.total!) return 1;
            if (a.total! > b.total!) return -1;
            if (a.gold! < b.gold!) return 1;
            if (a.gold! > b.gold!) return -1;
            if (a.silver! < b.silver!) return 1;
            if (a.silver! > b.silver!) return -1;
            return a.country!.localeCompare(b.country!) * -1;
        });
        let i: number = 0;
        let r: number = 0;
        let prev: Partial<CountryEntry> | undefined = undefined;
        result.forEach((e) => {
            e.key = ++i;
            if (prev == undefined) {
                r++;
                prev = e;
            }
            if (prev.total == e.total && prev.gold == e.gold && prev.silver == e.silver && prev.bronze == e.bronze) {
                e.rank = r;
            } else {
                r++;
                e.rank = r;
            }
            prev = e;
        });
        return result;
    },
    columns: [
        (<Table.Column key="rank" dataIndex="rank" render={(n) => n ? (
            <span className="font-bold font-primary text-hunyadi-yellow">#{n}</span>
        ) : (<></>)} width={80} />),
        (<Table.Column key="country" dataIndex="country" render={(c: string) => (
            <Tooltip className="font-primary" title={getCountryName(c)} placement="left">
                <ReactCountryFlag countryCode={c} svg style={{ marginRight: '0.5rem', width: '1.5rem', height: '1.5rem' }} />
                {getCountryName(c)}
            </Tooltip>
        )} ellipsis={true} />),
        (<Table.Column key="total" dataIndex="total" render={(t: number) => (
            <span className="font-bold">{t}</span>
        )} title={
            <span className="font-bold font-primary text-hunyadi-yellow">Total</span>
        } align="center" />),
        (<Table.Column key="gold" dataIndex="gold" title={
            <div className="flex w-full justify-center content-center">
                <MedalIcon place={1} size={28} fill="#D6AF36"/>
            </div>
        } align="center" />),
        (<Table.Column key="silver" dataIndex="silver" title={
            <div className="flex w-full justify-center content-center">
                <MedalIcon place={2} size={28} fill="#A7A7AD"/>
            </div>
        } align="center" />),
        (<Table.Column key="bronze" dataIndex="bronze" title={
            <div className="flex w-full justify-center content-center">
                <MedalIcon place={3} size={28} fill="#CC7B12"/>
            </div>
        } align="center" />),
    ],
    tableProps: {
        tableLayout: "fixed",
        pagination: false
    }
}

interface Props {
    sport: number;
}

const MedalForSingleSport: React.FC<Props> = (props) => {

    const [ src, setSrc ] = useState<string>('');
    const [ loaded, setLoaded ] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(false);
        if (Number.isNaN(props.sport)) {
            setSrc('');
            return () => {};
        }
        setSrc(`https://sota-backend.fly.dev/medal/s/${props.sport}`);
        setLoaded(true);
    }, [props.sport]);

    return loaded ? (
        <SotaTable src={src} {...opts} />
    ) : (
        <></>
    );

};

export default MedalForSingleSport;