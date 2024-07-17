import React ,{useContext} from 'react';
import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import CartContext from '../Context/cart-context';


const Cart =(props) =>{
    const cartContext =useContext(CartContext)
   let totalamount=0

   const removeItemHandler=(item)=>{
    cartContext.removeItem(item);
   }
   cartContext.items.forEach((item)=>{
    totalamount+=item.price
   })

   const purchaseHandler=()=>{
    alert('Thanks for puschase ')
    cartContext.cartBlank()
   }
   

    return (
        <Modal onClose={props.onClose}>
            <h1>Cart</h1>
            <table>
                <thead>
                    <th className={classes.heading}>Item</th>
                    <th className={classes.heading}>Price</th>
                    <th className={classes.heading}>Quantity</th>
                </thead>
                {cartContext.items.map((item)=>(
                    <tr>
                    <td className={classes.image}><img src={item.imageUrl} alt="" />{item.album}</td>
                    <td><h3 className={classes.price}>{item.price}.00</h3></td>
                    <td><p>{item.quantity}</p><br/>

                    <button className={classes.remove} onClick={()=>removeItemHandler(item)}>Remove</button></td>
                    </tr>
                ))}
            </table>
            {/* <button onClick={props.onClose}>Close</button> */}
            <h3 className={classes.price}>Total Amount : ${totalamount}</h3>
            {totalamount? <button onClick={purchaseHandler} className={classes.close}>Purchase</button>:''}
            <button onClick={props.onClose}  className={classes.close}>Close</button>

        </Modal>


    )
}


export default Cart;