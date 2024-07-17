import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Store from './Components/Store/Store';
import Cart from './Components/Modal/Cart';
import Banner from './Components/Banner.js/Banner';
import Footer from './Components/Footer/Footer';
import React, {useState} from 'react'

function App() {
  const [cartIsShown,setCartIsShown]=useState(false)

  const showCartHandler=()=>{
    setCartIsShown(true)
  }
  const hideCartHandler=()=>{
    setCartIsShown(false)

  }
  return (
    <div>
      
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Navbar onClick={showCartHandler}/>
      <Banner />
      <Store />
      <Footer />
    </div>
  );
}

export default App;
