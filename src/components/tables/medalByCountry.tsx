import { Table } from "antd";
import { SotaTable, SotaTableProps, TableRow } from "../tableComponent";
import MedalIcon from "../medalIcon";

interface CountryEntry {
    rank: number;
    country: string;
    total: number;
    gold: number;
    silver: number;
    bronze: number;
}

interface MedalObject {
    gold: number;
    silver: number;
    bronze: number;
}

const opts: SotaTableProps<CountryEntry> = {
    src: "https://sota-backend.fly.dev/medals",
    dataProcess: (data): TableRow<CountryEntry>[] => {
        let result: TableRow<CountryEntry>[] = [];
        for (const [country, medals] of Object.entries<MedalObject>(data)) {
            const total = medals.gold + medals.silver + medals.bronze;
            result.push({
                key: 0,
                rank: 0,
                country: country,
                total: total,
                gold: medals.gold,
                silver: medals.silver,
                bronze: medals.bronze
            });
        }
        result.sort((a: Partial<CountryEntry>, b: Partial<CountryEntry>) => {
            if (a.total! < b.total!) return 1;
            if (a.total! > b.total!) return -1;
            if (a.gold! < b.gold!) return 1;
            if (a.gold! > b.gold!) return -1;
            if (a.silver! < b.silver!) return 1;
            if (a.silver! > b.silver!) return -1;
            return 0;
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
        (<Table.Column key="rank" dataIndex="rank" className="before:content-['#']"/>),
        (<Table.Column key="country" dataIndex="country" />),
        (<Table.Column key="total" dataIndex="total" title="Total" align="center" />),
        (<Table.Column key="gold" dataIndex="gold" title={
            <MedalIcon place={1} size={24} fill="#D6AF36"/>
        } align="center" />),
        (<Table.Column key="silver" dataIndex="silver" title={
            <MedalIcon place={2} size={24} fill="#D6AF36"/>
        } align="center" />),
        (<Table.Column key="bronze" dataIndex="bronze" title={
            <MedalIcon place={3} size={24} fill="#D6AF36"/>
        } align="center" />),
    ]
}

const OverallMedalByCountry: React.FC = () => {
    return (
        <SotaTable {...opts} />
    )
};

export default OverallMedalByCountry;