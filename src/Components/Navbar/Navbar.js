import React ,{useState ,useContext} from 'react'
import classes from './Navbar.module.css'
import CartContext from '../Context/cart-context';
import {NavLink, Link} from 'react-router-dom'


const Navbar = (props) => {
     const [show, setShow]=useState(false);
     const cartContext=useContext(CartContext);
     let quantity= cartContext.items.length

  return (
    <>
    <nav className={classes.nav}>
        <ul className={classes.list}>
            <NavLink to='/home'><li>Home</li></NavLink>
            <NavLink to='/'><li>Store</li></NavLink>
            <NavLink to='/about'><li>About</li></NavLink>
        </ul>
        <div className={classes.cart}>
            <button className={classes.button} onClick={props.onClick}>Cart</button>
            <p className={classes.p}>{quantity}</p>
        </div>
    </nav>
    </>
  )
}

export default Navbar