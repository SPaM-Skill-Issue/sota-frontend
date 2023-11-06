import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const sportsData = [
    {
        sportId: 1,
        name: 'Archery',
        summary: 'Archery is one of the oldest sports still practised, developing alongside human civilisation, initially for hunting and warfare. In 1200 BC, the Hittites and Assyrians used bows and arrows on the battlefield. The first recorded archery tournaments took place in China during the Zhou dynasty (1027‑256 BC). In 1931 the sport evolved around the globe and an international archery federation was founded, now known as World Archery.',
        types: ["Individual Men's", "Individual Women's", "Team Men's", "Team Women's", "Team Mixed"],
        paticipatingCountries: ["KR", "US", "JP", "NL", "CN", "KZ", "TR", "ID", "CA", "BD", "CL", "MX", "MY", "VI", "IT", "GB", "UA", "IN", "DE", "RU", "FR", "AU", "BR", "SI", "BE", "ES", "FI", "MD", "VN", "MN", "LU", "EG", "CO", "PL", "IL", "HU", "TN", "IR", "MW", "TW", "AU", "BY", "BT", "TD", "CZ", "DK", "EC", "EE", "GR", "RO", "SK", "SE"],
    },
    {
        sportId: 2,
        name: 'Artistic Gymnastics',
        summary: 'Introduced in 1894, artistic gymnastics was one of the original disciplines in the modern Olympic Games. Artistic gymnasts are challenged to perfect their skills across a range of equipment, such as the beam and performing on the floor.',
        types: ["Team Men's", "Team Women's", "Individual All-Around Men's", "Individual All-Around Women's", "Floor exercise Men's", "Floor exercise Women's", "Vault Men's", "Vault Women's", "Balance Beam", "High Bar", "Parallel Bars", "Pommel Horse", "Still Rings", "Uneven Bars",],
        paticipatingCountries: ["JP", "CN", "RU", "US", "GB", "DE", "CH", "UA", "BR", "TW", "RU", "FR", "BE", "IT", "JP", "CA", "TR", "KZ", "KR", "ES", "MX", "US", "HU", "NL", "IL", "IT", "KR", "AM", "PH", "HK", "CN", "HR", "AU", "CY", "TW", "IE", "AL", "GR", "BE", "SE"],
    },
    {
        sportId: 3,
        name: 'Artistic Swimming',
        summary: 'Artistic swimming developed by combining water acrobatics with music. Although the first contests were organised for men, artistic swimming later became more associated with women. After a number of demonstrations in the US in the early 20th century, the discipline grew in popularity and the first competitions were organised.',
        types: [],
        paticipatingCountries: [],
    },
    {
        sportId: 4,
        name: 'Athletics',
        summary: 'Contested in the first ancient Olympic Games, athletics is the oldest sport on record, with the names of champions documented from as far back as 776 BC. The ancient Olympic Games included events such as running races and a pentathlon event that consisted of a running race, long jump, discus throw, javelin throw and wrestling. The first meets in modern times that can be likened to the athletics competitions we know today took place in 1840 in Shropshire, England. Other such championships began to thrive and spread in the 1880s, initially in England, the USA and Europe in particular. In 1912, the international federation that oversees international athletics competitions, the IAAF (now known as World Athletics) was set up.',
        types: [],
        paticipatingCountries: [],
    },
    {
        sportId: 5,
        name: 'Badminton',
        summary: 'Badminton is a racket sport whose exact origins are still a tantalising mystery. It evolved from the older game of Battledor and Shuttlecock, which was a popular pastime in Europe, particularly among the affluent classes. However, it is not known exactly when Battledore and Shuttlecock transformed into the competitive sport of badminton. One plausible theory is that badminton was first played at the stately home of the Duke of Beaufort in Gloucestershire sometime in the early 1860s and thus was named after his estate, which was called Badminton House. The game travelled to India where it became a popular sport in the military cantonments. Gradually it spread in the British colonies and then to Europe and East Asia. Badminton today is a global sport with widespread appeal for people of all ages and abilities.',
        types: [],
        paticipatingCountries: [],
    },
    {
        sportId: 6,
        name: 'Basketball',
        summary: 'Basketball was invented by James W. Naismith to keep his students fit during the winter. In December 1891, the physical education teacher at the YMCA International Training School in Springfield, USA sought a suitable indoor sport - and most of his rules still apply today. In the 1920s, the first international games were played and the first World Championships for Men and Women took place in the 1950s.',
        types: [],
        paticipatingCountries: [],
    },
];


const SportsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const sport = sportsData.find((sport) => sport.sportId === parseInt(id, 10));

    const goToNextPage = () => {
        const nextPage = parseInt(id, 10) + 1;
        navigate(`/sports/${nextPage}`);
    };

    return (
        <div>
            <div className='flex bg-belft-blue rounded-2xl'>
                {sport ? (
                    <div className='p-5 text-white font-primary'>
                        <div>Sport Name: {sport.name}</div>
                    </div>
                ) : (
                    <div>Sport not found</div>
                )}
            </div>
            <div className='flex pt-3 w-full'>
                <div className='flex justify-start w-1/2 text-white'>
                    <a href='/sports'><ArrowLeftOutlined /> Back to all sports list</a>
                </div>
                <div className='flex justify-end w-1/2 text-white'>
                    <a onClick={goToNextPage}>Next sport details <ArrowRightOutlined /></a>
                </div>
            </div>
        </div>
    );
};

export default SportsDetail;
