 import React ,{useState}  from 'react';
 import MovieCard from '../movies-card/movie-card.component'
 import './search-movies.style.css';

export default function SearchMovies(){
    
    //states- input query, movies
    const [query, setQuery] = useState('');

    //create the state for movies, and update that state appropriate
    const [movies, setMovies] = useState([]);
    //console.log({movies});
    
    const searchMovies = async (e) => {
        
        e.preventDefault();
        console.log(query);
        //let x=query.split(' ');  
        //console.log(x);
        //let x=query;      
        const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            //console.log(res.json());
            const data  = await res.json();
            console.log(data);
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }
    
    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                   <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>

        </>
    )
}

