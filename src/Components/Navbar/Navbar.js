import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import classes from './Navbar.module.css'
import CartContext from '../Context/cart-context'
import AuthContext from '../../Auth-Context/auth-context'

const Navbar = (props) => {
  const navigate = useNavigate()
  const cartContext = useContext(CartContext)
  const authCtx = useContext(AuthContext)

  const quantity = cartContext.items.length
  const isLoggedIn = authCtx.isLoggedIn

  const logoutHandler = () => {
    authCtx.logout()
    navigate('/login')
  }

  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        <NavLink to='/'><li>Home</li></NavLink>
        {isLoggedIn ? <NavLink to='/store'><li>Store</li></NavLink> :<NavLink to='/login'><li>Store</li></NavLink>}
        <NavLink to='/about'><li>About</li></NavLink>
        <NavLink to='/contact'><li>Contact</li></NavLink>
        {isLoggedIn && <NavLink to='/profile'><li>Profile</li></NavLink>}
      </ul>
      <div className={classes.cart}>
        {!isLoggedIn && <NavLink to='/login'><h3 className={classes.login}>Login</h3></NavLink>}
        {isLoggedIn && <h3 onClick={logoutHandler} className={classes.login}>Logout</h3>}
        {isLoggedIn && <button className={classes.button} onClick={props.onClick}>Cart</button>}
        {isLoggedIn && <p className={classes.p}>{quantity}</p>}
      </div>
    </nav>
  )
}

export default Navbar;
