

import React, { useState ,useContext} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Store from './Components/Store/Store';
import Cart from './Components/Modal/Cart';
import Footer from './Components/Footer/Footer';
import CartProvider from './Components/Context/CartProvider';
import About from './Components/About/About';
import Home from './Components/Home/Home';
import ContactUs from './Components/ContactUs/ContactUs';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Login from './Components/AuthForm/AuthForm';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import AuthContext from './Store/auth-context';
import NotFound from './NotFound/NotFound';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const authcontext=useContext(AuthContext);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const productsArr = [
    {
      id: 1,
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      album: 'Album 1',
      quantity: 1
    },
    {
      id: 2,
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      album: 'Album 2',
      quantity: 1
    },
    {
      id: 3,
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      album: 'Album 3',
      quantity: 1
    },
    {
      id: 4,
      title: 'Blue Color',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
      album: 'Album 4',
      quantity: 1
    }
  ];

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar onClick={showCartHandler} />
        <Routes>
          <Route path='/store' element={<Store productsArr={productsArr} />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/products/:productId' element={<ProductDetail productsArr={productsArr} />} />
          <Route path='/login' element={<Login />}/>
          {authcontext.isLoggedIn && <Route path='/password' element={<ChangePassword/>}/>}
          <Route path='*' element={<NotFound />}/>
        </Routes>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
