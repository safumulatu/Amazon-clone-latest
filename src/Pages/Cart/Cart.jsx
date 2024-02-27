import  { useContext } from 'react';
import './cart.css';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/product/ProductCard';
import CurrencyFormat from '../../components/Currencyformat/CurrencyFormat';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { ...item, amount: item.amount + 1 },
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className="container">
        <div className="cart__container">
          <h2>hi there 👋👋👋</h2>
          <h3>your shopping detail</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>There are currently no items in your cart 😟😟😟</p>
          ) : (
            basket?.map((item) => (
              <section className="cart_product" key={item.id}>
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className="btn_container">
                  <button className="btn" onClick={() => increment(item)}>
                    <AddIcon className='addicon' size={20} />
                  </button>
                  <span>{item.amount}</span>
                  <button className="btn" onClick={() => decrement(item.id)}>
                    <RemoveIcon className='remove' size={20} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className="subtotal">
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
