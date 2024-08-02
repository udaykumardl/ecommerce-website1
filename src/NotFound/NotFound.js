import classes from './NotFound.module.css'
import { useNavigate } from 'react-router';


const NotFound =()=>{
    const navigate=useNavigate()

    const RedirectHomePage=()=>{
        navigate('/')
    }
    return(
        <div className={classes.maindiv}>
            <h1 className={classes.h1}>Error 404</h1>
            <h3 className={classes.h3}>Page Not Found</h3>
            <button onClick={RedirectHomePage}>Go To Home Page</button>
        </div>
    )

}

export default NotFound;