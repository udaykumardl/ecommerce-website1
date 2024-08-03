// import CartContext from "./cart-context";
// import React ,{useState} from 'react'

// const CartProvider = (props)=>{
//     const [items ,setItems]=useState([])

//     const addItemHandler=(item)=>{
//         console.log('cart Context',item)

//         let existingElement=items.find(element=>element.title===item.title)
//         if(existingElement){
//             alert('Item alredy exist')
//         }
//         else{
//             setItems((prevState)=>[...prevState,item])
//         }
//     }

//         const removeItemHandler=(item)=>{
//             const filteredItem=items.filter((ele)=>ele.title!==item.title)
//             setItems(filteredItem)
//         }

//         const cartBlankHandler=()=>{
//             setItems([])
//         }

//     let cartContext={
//         items:items,
//         addItem:addItemHandler,
//         removeItem:removeItemHandler,
//         cartBlank:cartBlankHandler

//      }
//     return (
//         <CartContext.Provider value={cartContext}>
//             {props.children}
//         </CartContext.Provider>
//     )


// }

// export default CartProvider;




import React, { useEffect, useState } from 'react'
import CartContext from './cart-context'

const CartProvider = (props) => {
    const [items,setItems]=useState([])
    
    const token=localStorage.getItem('token')

    const fetchData = async () => {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
      
        if (!email || !token) {
          console.error('Email or token not found in localStorage');
          return;
        }
      
        const newEmail = email.replace(/[^\w\s]/gi, "");
        
        try {
          const response = await fetch(`https://react-http-834f8-default-rtdb.firebaseio.com/cartItems/${newEmail}.json?auth=${token}`);
      
          if (!response.ok) {
            console.error('Failed to fetch cart items');
            return;
          }
      
          const existingItems = await response.json();
          if (existingItems) {
            const updatedItems = Object.values(existingItems); // Convert object to array
            setItems(updatedItems);
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      };
      
  useEffect(() => {
      fetchData(); // Fetch data when component mounts
  }, [token]);

  const addItemHandler = async (item) => {
    console.log('Cart Context', item);
  
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('Email not found in localStorage');
      return;
    }
  
    const newEmail = email.replace(/[^\w\s]/gi, "");
    try {
      const response = await fetch(`https://react-http-834f8-default-rtdb.firebaseio.com/cartItems/${newEmail}.json`);
      if (!response.ok) {
        console.error('Failed to fetch cart items');
        return;
      }
  
      const ExistingItems = await response.json();
      let updatedItems = [];
      if (ExistingItems) {
        updatedItems = Object.values(ExistingItems); // Convert Object to array
      }
      updatedItems.push(item);
  
      await fetch(`https://react-http-834f8-default-rtdb.firebaseio.com/cartItems/${newEmail}.json`, {
        method: 'PUT',
        body: JSON.stringify(updatedItems),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setItems(updatedItems);
      console.log(items);
    } catch (error) {
      console.error('Error saving cart item:', error);
    }
  };
  
    const removeItemHandler=async(item,index)=>{

      const email = localStorage.getItem('email');
    const newEmail = email.replace(/[^\w\s]/gi, "");

    if (!email) {
        console.error('Email not found in localStorage');
        return;
    }

    const updatedItems = [...items]; // Create a copy of items array
    updatedItems.splice(index, 1); // Remove item at the specified index

    setItems(updatedItems); // Update the local state

    // Update the item list in Firebase
    const response = await fetch(`https://react-http-834f8-default-rtdb.firebaseio.com/cartItems/${newEmail}.json`, {
        method: 'PUT',
        body: JSON.stringify(updatedItems),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.error('Failed to delete item from cart at index:', index);
    } else {
        console.log('Item removed from cart at index:', index);
    }


    }
    const cartBlankHandler=()=>{
      setItems([])
    }
    let cartContext={
        items:items,
        addItem:addItemHandler,
        removeItem:removeItemHandler,
        fetchData:fetchData,
        cartBlank:cartBlankHandler
    }
  return (
   <CartContext.Provider value={cartContext}>
    {props.children}
   </CartContext.Provider>
  )
}
export default CartProvider;