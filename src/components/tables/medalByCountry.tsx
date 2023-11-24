import { Table, Tooltip } from "antd";
import { CountryEntry, MedalObject } from "../../interfaces/table";
import { SotaTable, SotaTableProps, TableRow } from "../tableComponent";
import { getCountryName } from "../../util/iso31661a2";
import MedalIcon from "../medalIcon";
import ReactCountryFlag from "react-country-flag";

const opts: SotaTableProps<CountryEntry> = {
    src: "https://sota-backend.fly.dev/medals",
    dataProcess: (data): TableRow<CountryEntry>[] => {
        if (Object.keys(data).length === 0) return [];
        const result: TableRow<CountryEntry>[] = [];
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
        (<Table.Column key="rank" dataIndex="rank" width={50} className="before:content-['#'] before:font-bold before:font-primary font-bold font-primary" />),
        (<Table.Column key="country" dataIndex="country" width={85} render={(c: string) => (
            <Tooltip className="font-primary" title={getCountryName(c)} placement="right">
                <ReactCountryFlag countryCode={c} svg style={{ marginRight: '0.5rem', width: '1.5rem', height: '1.5rem' }} />
                {c}
            </Tooltip>
        )} />),
        (<Table.Column key="total" dataIndex="total" render={(t: number) => (
            <span className="text-shamrock-green font-bold">{t}</span>
        )} title={(
            <span className="text-shamrock-green font-primary font-bold">Total</span>
        )} align="center" />),
        (<Table.Column key="gold" dataIndex="gold" title={
            <div className="flex w-full justify-center content-center">
                <MedalIcon place={1} size={28} fill="#D6AF36" />
            </div>
        } align="center" />),
        (<Table.Column key="silver" dataIndex="silver" title={
            <div className="flex w-full justify-center content-center">
                <MedalIcon place={2} size={28} fill="#A7A7AD" />
            </div>
        } align="center" />),
        (<Table.Column key="bronze" dataIndex="bronze" title={
            <div className="flex w-full justify-center content-center">
                <MedalIcon place={3} size={28} fill="#CC7B12" />
            </div>
        } align="center" />),
    ],
    tableProps: {
        size: "small",
        tableLayout: "fixed",
        pagination: {
            position: ["topRight"]
        }
    }
}

const OverallMedalByCountry: React.FC = () => (<SotaTable {...opts} />);

export default OverallMedalByCountry;