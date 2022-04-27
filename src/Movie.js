import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Moment from "react-moment";

function Movie() {
    const API_KEY = "0111ac1e0f6dee43535dee4345480c53";
    const ID = useParams().id;
    const [movie, setMovie] = useState();
    const [video, setVideo] = useState();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${ID}?api_key=${API_KEY}`)
            .then(response => {
                setMovie(response.data);
                console.clear();
            })
            .catch(error => {
                console.warn(error);
            });
        axios.get(`https://api.themoviedb.org/3/movie/${ID}/videos?api_key=${API_KEY}`)
            .then(response => {
                setVideo(response.data);
            })
            .catch(error => {
                console.warn(error);
            });
    }, [ID]);

    return (
        <>
            {movie && (
                <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
                    <div className="flex-none mx-auto">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}
                             className="w-60 lg:w-80"/>
                    </div>
                    <div className="md:ml-24">
                        <h2 className="text-4xl mt-4 my-2 md:mt-0 font-semibold">{movie.title}</h2>
                        <div className="flex flex-wrap items-center text-gray-600 text-sm">
                            <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24">
                                <g data-name="Layer 2">
                                    <path
                                        d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                                        data-name="star"></path>
                                </g>
                            </svg>
                            <span className="ml-1">{movie.vote_average * 10}%</span>
                            <span className="mx-2">|</span>
                            <span><Moment format="LL" date={movie.release_date}/></span>
                            <span className="mx-2">|</span>
                            {movie.genres.map(genre => (
                                <span key={genre.id}>{genre.name}&nbsp;</span>
                            ))}
                        </div>
                        <p className="text-gray-600 mt-4">
                            <i>{movie.tagline}</i>
                        </p>
                        <p className="text-gray-600 mt-4">
                            {movie.overview}
                        </p>
                        {video && (
                            <div className="mt-4 flex">
                                <iframe
                                    title="trailer"
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${video.results[0].key}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Movie;