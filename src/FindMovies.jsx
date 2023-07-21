import { useState } from 'react'
import './styles/findMovies.css'



export const FindMovies = () => {

    const urlBase = "https://api.themoviedb.org/3/search/movie";
    const API_KEY = "bde1b347a98ca8ed2cedf4df0cfb1788";

    const [movie, setMovie] = useState('');
    const [movies, setMovies] = useState([]);

    const handleInputChange = (e) => {
        setMovie(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (movie.length > 0) { fetchMovies(); }
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${movie}&api_key=${API_KEY}`);

            const data = await response.json();

            setMovies(data.results);

        } catch (e) {
            console.error('Ha ocurrido un error: ', e)
        }
    }

    return (
        <div className='container'>
            <h1 className='title'>Find Movie 🎬</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Insert a movie name...'
                    value={movie}
                    onChange={handleInputChange}
                />
                <button type='submit' className='search-button'>Search</button>
            </form>
            <div className="movie-list">
                {movies&&movies.map((item) => (
                    <div key={item.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                        <h2>{item.title}</h2>
                        <p>{item.overview}</p>
                    </div>

                ))}
            </div>
        </div>
    )
}