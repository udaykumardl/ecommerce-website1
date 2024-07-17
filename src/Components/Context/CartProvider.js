import CartContext from "./cart-context";
import React ,{useState} from 'react'

const CartProvider = (props)=>{
    const [items ,setItems]=useState([])

    const addItemHandler=(item)=>{
        console.log('cart Context',item)

        let existingElement=items.find(element=>element.title===item.title)
        if(existingElement){
            alert('Item alredy exist')
        }
        else{
            setItems((prevState)=>[...prevState,item])
        }
    }

        const removeItemHandler=(item)=>{
            const filteredItem=items.filter((ele)=>ele.title!==item.title)
            setItems(filteredItem)
        }

        const cartBlankHandler=()=>{
            setItems([])
        }

    let cartContext={
        items:items,
        addItem:addItemHandler,
        removeItem:removeItemHandler,
        cartBlank:cartBlankHandler

     }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )


}

export default CartProvider;