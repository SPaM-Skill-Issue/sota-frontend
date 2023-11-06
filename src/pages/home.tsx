import MostInterestSports from '../components/mostInterestSports';
import OverallMedal from '../components/overallMedal';

const Home = () => {
    return (
        <div className='flex-row'>
            <div className="">
                <OverallMedal />
            </div>
            <div className='mt-5'>
                <MostInterestSports />
            </div>
        </div>
    );
}

export default Home;