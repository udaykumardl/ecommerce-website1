import React ,{useState ,useEffect,useCallback, useRef } from 'react'
import classes from './MovieData.module.css'

const MovieData =() =>{
    const [movies ,setMovies] =useState ([])
    const [isLoading, setIsLoading]=useState(false)
    const [error, setError]=useState(null)
    const cancelRetryRef = useRef(false);

    const cancelHandler=()=>{
        cancelRetryRef.current = true;
        setIsLoading(false);
        setError('Retrying canceled by user');
    }

    const fetchMoviesHandler = useCallback(async (retryCount=0) =>{
        let MAX_RETRY_COUNT=5;
        const RETRY_INTERVAL = 5000;

        if (cancelRetryRef.current){
            return;
        }

        setIsLoading(true)
        setError(null);

        try{
          const response= await fetch('https://swapi.dev/api/films/')
          
          if(!response.ok){
            throw new Error('Something went wrong! Retrying...')
          }    
          const data= await response.json()

          const transformedMovies =data.results.map(movieData =>({
                
                id:movieData.eposide_id,
                title:movieData.title,
                openingText:movieData.opening_crawl,
                releaseDate:movieData.release_date
            }))

            setMovies(transformedMovies);
            setIsLoading(false)
        }
        //     catch (error) {
        //         setError(error.message);
        //         if(retryCount < MAX_RETRY_COUNT){
        //             setError(`${error.message} Retrying...`);
        //             setTimeout(()=>{
        //                 fetchMoviesHandler(retryCount+1)
        //             },5000)
        //         }
        //     }
        //     setIsLoading(false);
        // }, [])
        catch (error) {
            setError(`${error.message} Retrying...`);
            if (retryCount < MAX_RETRY_COUNT && !cancelRetryRef.current) {
              setTimeout(() => {
                fetchMoviesHandler(retryCount + 1);
              }, RETRY_INTERVAL);
            } else if (cancelRetryRef.current) {
              setError('Retrying canceled by user');
            } else {
              setError('Something went wrong! Maximum retry attempts reached.');
            }
            setIsLoading(false);
          }
        }, []);
        
    useEffect(()=>{
        fetchMoviesHandler();
        return ()=>{
            cancelRetryRef.current=true;
        }
    },[fetchMoviesHandler])

    

    return (
    <div>
        <button className={classes.button} onClick={fetchMoviesHandler}>Fetch Movie</button>
        <button  className={classes.button}  onClick={cancelHandler}>Cancel</button>

            
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

            {/* <button onClick={cancelHandler}>Cancel</button> */}
    </div>

    )

}

export default MovieData;

