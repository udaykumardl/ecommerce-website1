import React ,{useState ,useContext} from 'react'
import classes from './Navbar.module.css'
import CartContext from '../Context/cart-context';
import {NavLink,useNavigate} from 'react-router-dom'
import AuthContext from '../../Store/auth-context';


const Navbar = (props) => {
    const navigate=useNavigate();
     const [show, setShow]=useState(false);
     const cartContext=useContext(CartContext);
     const authCtx=useContext(AuthContext);

     let quantity= cartContext.items.length
     const isLoggedIn = authCtx.isLoggedIn

     const logoutHandler=()=>{
        authCtx.logout()
        navigate('/login')
     }

  return (
    <>
    <nav className={classes.nav}>
        <ul className={classes.list}>
            <NavLink to='/home'><li>Home</li></NavLink>
            <NavLink to='/'><li>Store</li></NavLink>
            <NavLink to='/about'><li>About</li></NavLink>
            <NavLink to='/contact'><li>Contact</li></NavLink>
            {isLoggedIn && <NavLink to='/password'><li>Profile</li></NavLink>}
        </ul>

        <div className={classes.cart}>
            {!isLoggedIn && <NavLink to='/login'><h3 className={classes.login}>Login</h3></NavLink> }
            {isLoggedIn && <h3  onClick={logoutHandler} className={classes.login}>Logout</h3>}
            {isLoggedIn && <button className={classes.button} onClick={props.onClick}>Cart</button>}
            {isLoggedIn && <p className={classes.p}>{quantity}</p>}
        </div>
    </nav>
    </>
  )
}

export default Navbar;