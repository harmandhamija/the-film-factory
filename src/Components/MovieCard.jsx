// MovieCard.jsx

import NoPoster from "../assets/NoPoster.png";

const MovieCard = ({ movie, setSearchedMovie, children, setRecommendedArray, selectedArray, setShowSuggestedFilms }) => {

    const handleClick = () => {
        setRecommendedArray([]);
        setSearchedMovie(movie);
        setShowSuggestedFilms(true);
    }

    let selected = false;

    if (selectedArray && selectedArray.includes(movie.id)) {
        selected = true;
    }

    return (
        movie.release_date ?

            <button className={`movieCard ${selected ? 'selected' : ""}`} onClick={handleClick}>
                {movie.poster_path
                    ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Poster for ${movie.title}`}></img>
                    : <img src={NoPoster} alt="Poster not available"></img>
                }
                <div className="movieCardText">
                    <h3>{movie.title}</h3>
                    {movie.release_date ? <h3> ({movie.release_date.slice(0, 4)}) </h3> : null}
                    {children}
                </div>
            </button>

            : null
    )
}

export default MovieCard;