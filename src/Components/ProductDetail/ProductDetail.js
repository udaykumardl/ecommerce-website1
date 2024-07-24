// import React from 'react';
// import { useParams } from 'react-router-dom';
// import classes from './ProductDetail.module.css';

// const ProductDetail = ({ productsArr }) => {
//   const { productId } = useParams();

//   // Find the product with the matching productId
//   const product = productsArr.find(product => product.id === parseInt(productId));

//   // If no product found, you can display a message or redirect to a 404 page
//   if (!product) {
//     return <div className={classes.productDetail}>Product not found</div>;
//   }

//   return (
//     <div className={classes.productDetail}>
//       <h2 className={classes.productTitle}>Product Detail</h2>
//       <img src={product.imageUrl} alt={product.title} className={classes.productImage} />
//       <p className={classes.productTitle}>{product.title}</p>
//       <p className={classes.productPrice}>Price: {product.price}.00</p>
//     </div>
//   );
// };

// export default ProductDetail;



import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './ProductDetail.module.css';

const ProductDetail = ({ productsArr }) => {
  const { productId } = useParams();

  // Parse productId as an integer
  const product = productsArr.find(product => product.id === parseInt(productId, 10));

  // If no product found, you can display a message or redirect to a 404 page
  if (!product) {
    return <div className={classes.productDetail}>Product not found</div>;
  }

  return (
    <div className={classes.productDetail}>
      <h2 className={classes.productTitle}>Product Detail</h2>
      <img src={product.imageUrl} alt={product.title} className={classes.productImage} />
      <p className={classes.productTitle}>{product.title}</p>
      <p className={classes.productPrice}>Price: {product.price}.00</p>
    </div>
  );
};

export default ProductDetail;
