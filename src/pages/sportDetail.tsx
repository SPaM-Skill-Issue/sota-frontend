import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined } from '@ant-design/icons';
import SportsIcons from "../components/sportsIcons";
import ReactCountryFlag from "react-country-flag";
import "../styles/scrollbar.css"
import { useEffect, useState } from 'react';
import { Sport } from '../interfaces/sport'
import { Spin } from 'antd';


type SportParams = {
    id: string;
};

const SportsDetail = () => {
    const { id } = useParams<SportParams>();
    const navigate = useNavigate();

    const [sport, setSport] = useState<Sport | null>();
    const [loading, setLoading] = useState(true);

    const fetchSport = async (sportId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`https://sota-backend.fly.dev/sport/${sportId}`);
            const data: Sport = await res.json();
            if (Object.keys(data).length !== 0) {
                setSport(data);
            } else {
                setSport(null);
            }
        } catch (error) {
            console.error("Error fetching sport data: ", error);
            setSport(null)
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (id) { fetchSport(id); }
        else {
            setLoading(false)
        }
    }, [id]);

    const goToNextPage = () => {
        const nextPage = parseInt(id!, 10) + 1;
        navigate(`/sports/${nextPage}`);
    };

    const goToPreviousPage = () => {
        const nextPage = parseInt(id!, 10) - 1;
        navigate(`/sports/${nextPage}`);
    };

    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center w-screen h-[75vh]">
                    {/* Spin component from Ant Design */}
                    <Spin size="large" />
                </div>
            ) : (
                <div>
                    <div className='flex bg-belft-blue rounded-2xl'>
                        {sport ? (
                            <div className="container mx-auto px-4 pt-4 pb-8">
                                <div className="grid grid-rows-10 grid-cols-10">
                                    <div className="row-span-6 col-span-3 flex justify-center items-center">
                                        <div style={{ fill: "#DBA94D", width: "100%", height: "100%" }} className="w-full h-full">
                                            <SportsIcons sportId={sport.sport_id} />
                                        </div>
                                    </div>
                                    <div className="row-span-2 col-span-7">
                                        <div className="font-primary text-center text-hunyadi-yellow font-bold text-6xl h-full flex items-center justify-center">
                                            <h1>{sport.sport_name}</h1>
                                        </div>
                                    </div>
                                    {/* Summary section */}
                                    <div className="row-span-4 col-span-7 space-y-4">
                                        <div className='font-primary text-white text-3xl'>
                                            <h2>Summary</h2>
                                        </div>

                                        <div className="font-body block px-6 py-4 w-full h-48 text-xl rounded-lg border bg-belft-blue-light border-gray-600 text-white overflow-y-auto">
                                            <p className='indent-10'>{sport.sport_summary}</p>
                                        </div>
                                    </div>

                                    {/* Sport types section */}
                                    <div className='row-span-4 col-span-4 space-y-4 mr-12'>
                                        <div className='font-primary text-white text-3xl'>
                                            <h2>Sport types</h2>
                                        </div>
                                        <div className="font-body block p-2.5 w-full h-48 text-xl rounded-lg border bg-belft-blue-light border-gray-600 text-white overflow-y-auto">
                                            <ul className="list-disc pl-5 space-y-2">
                                                {sport.sport_types.map((type, index) => (
                                                    <li key={index}>{type.type_name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Participating Countries section */}
                                    <div className='row-span-4 col-span-6 space-y-4'>
                                        <div className='font-primary text-white text-3xl'>
                                            <h2>Participating Countries</h2>
                                        </div>
                                        <div className='h-48 rounded-lg border bg-belft-blue-light border-gray-600 overflow-y-auto'>
                                            <div className="flex flex-wrap w-full h-auto p-3">
                                                {sport.participating_countries.map((countryCode, index) => (
                                                    <ReactCountryFlag
                                                        key={index} className='mx-3 flex justify-center items-center'
                                                        countryCode={countryCode}
                                                        svg
                                                        style={{
                                                            width: '3em',
                                                            height: '3em',
                                                        }}
                                                        title={countryCode}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="
                        flex
                        items-center
                        justify-center
                        w-screen
                        h-[75vh]
                        bg-belft-blue
                        from-indigo-600
                        to-blue-400
                        rounded-2xl
                    "
                            >
                                {/* Sport Not Found section */}
                                <div className="px-32 py-20 bg-belft-blue-light rounded-md shadow-xl">
                                    <div className="flex flex-col items-center">
                                        <h1 className="mb-4 text-5xl font-bold text-center text-hunyadi-yellow">
                                            <span className="text-rufous-red">Oops!</span> Sport id <span className="text-rufous-red">{id}</span> not found
                                        </h1>
                                        <p className="mb-8 text-center text-white">
                                            The sport you’re looking for doesn’t exist.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex pt-3 w-full'>
                        <div className='flex justify-start w-1/2 text-white'>
                            <a href='/sports'><RollbackOutlined /> Back to all sports list</a>
                        </div>
                        <div className='flex justify-end w-1/2 text-white space-x-8'>
                            <a onClick={goToPreviousPage}> <ArrowLeftOutlined /> Previous sport details</a>
                            <a onClick={goToNextPage}>Next sport details <ArrowRightOutlined /></a>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default SportsDetail;
