import  { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../Currencyformat/CurrencyFormat';
import './produc.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/ActionType';
function ProductCard({product,flex,renderDesc,renderAdd}) {
  const { image, title, id, rating, price,description  } = product;

    const [state,dispatch]=useContext(DataContext)
    console.log(state)
    
    const addToCart = ()=>{
      dispatch({
          type:Type.ADD_TO_BASKET,
          item:{
              image, title, id, rating, price,description
          }
      })
    }

  return (
    <div className={`card__container ${flex ? 'product__flexed' : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className='img_container' />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className='rating'>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd &&
          <button className='button' onClick={addToCart}>
            add to cart
          </button>
        }
      </div>
    </div>
  );
}

export default ProductCard;
