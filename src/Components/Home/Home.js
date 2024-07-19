import React from 'react'
import classes from './Home.module.css'
import HomePageBanner from '../HomePageBanner/HomePageBanner'
import MovieData from '../MovieData/MovieData'
import AddNewMovie from '../MovieData/AddNewMovie'

const Home= () =>{
   return (
        <div>
            <HomePageBanner />
            <h2 className={classes.heading}>MOVIES</h2>
            
            <MovieData />
            
        </div>

    )

}

export default Home;