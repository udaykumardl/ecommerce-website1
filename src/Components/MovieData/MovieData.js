import React ,{useState ,useEffect,useCallback } from 'react'
import classes from './MovieData.module.css'

const MovieData =() =>{
    const [movies ,setMovies] =useState ([])
    const [isLoading, setIsLoading]=useState(false)
    const [error, setError]=useState(null)

    const fetchMoviesHandler = useCallback(async () =>{
        setIsLoading(true)
        setError(null);
        try{
          const response= await fetch('https://swapi.dev/api/films/')
          
          if(!response.ok){
            throw new Error('Something went wrong!')
          }    
          const data= await response.json()

          const transformedMovies =data.results.map(movieData =>({
                
                id:movieData.edoside_id,
                title:movieData.title,
                openingText:movieData.opening_crawl,
                releaseDate:movieData.release_date
            }))

            setMovies(transformedMovies);
            setIsLoading(false)
        }
            catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        }, [])

        
    useEffect(()=>{
        fetchMoviesHandler();
    },[fetchMoviesHandler])

    

    return (
    <div>
        <button className={classes.button} onClick={fetchMoviesHandler}>Fetch Movie</button>
            
            <div className={classes.maindiv}>
                {!isLoading && movies.length>0 &&  movies.map((movie, index) => (
                    <div className={classes.item} key={index}>
                        <div className={classes.innerdiv}>
                            <h3 className={classes.place}>{movie.title}</h3>
                            <h5 className={classes.date}>Release Date:{movie.releaseDate}</h5>
                        </div>

                        <td className={classes.city}>{movie.openingText}</td><br/>
                        <td><button>BUY TICKETS</button></td>
                    </div>
                ))}
                {!isLoading && movies.length===0 && !error && <p>Found no movies</p>}
                {isLoading && <p>Loading ...</p>}
                {!isLoading && error && <p>{error}</p>}
            </div>

    </div>

    )

}

export default MovieData;

