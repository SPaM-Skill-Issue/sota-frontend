interface SportCardProps {
    sportName: string;
    sportIcon: JSX.Element;
    color: string;
}

const SportCard: React.FC<SportCardProps> = ({ sportName, sportIcon, color }) => {
    return (
        <div className="flex-row w-fit">
            <div style={{ fill: color, width: 160, height: 160 }} className="flex justify-center">
                {sportIcon}
            </div>
            <div style={{ color: color }} className="flex justify-center font-body text-xl mb-5">
                {sportName}
            </div>
        </div>
    )
};

export default SportCard;