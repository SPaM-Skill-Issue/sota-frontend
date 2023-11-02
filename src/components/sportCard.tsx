interface SportCardProps {
    sportName: string;
    sportIcon: JSX.Element;
}

const SportCard: React.FC<SportCardProps> = ({ sportName, sportIcon }) => {
    return (
        <div className="flex">
            <div>
                {sportIcon}
            </div>
            <div>
                {sportName}
            </div>
        </div>
    )
};

export default SportCard;