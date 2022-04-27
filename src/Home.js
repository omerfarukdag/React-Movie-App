import {useEffect, useState} from "react";
import axios from "axios";
import Moment from "react-moment";
import {Link} from "react-router-dom";

function Home(props) {
    const API_KEY = "0111ac1e0f6dee43535dee4345480c53";
    const TYPE = props.type ? props.type : "popular";
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${TYPE}?api_key=${API_KEY}`)
            .then(response => {
                setMovies(response.data.results);
                console.clear();
            })
            .catch(error => {
                console.warn(error);
            });
    }, [TYPE]);

    return (
        <>
            <div className="mx-auto container px-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {movies.map((item, index) => {
                        return (
                            <div key={index} className="mt-8">
                                <Link to={`/movie/${item.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                         alt="poster" className="hover:opacity-75 transition ease-in-out duration-150"/>
                                </Link>
                                <div className="mt-2">
                                    <Link to={`/movie/${item.id}`}
                                          className="text-lg mt-2 hover:text-gray-300">{item.title}</Link>
                                    <div className="flex items-center text-gray-600 text-sm mt-1">
                                        <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24">
                                            <g data-name="Layer 2">
                                                <path
                                                    d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                                                    data-name="star"></path>
                                            </g>
                                        </svg>
                                        <span className="ml-1">{item.vote_average * 10}%</span>
                                        <span className="mx-2">|</span>
                                        <span><Moment format="LL" date={item.release_date}/></span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Home;