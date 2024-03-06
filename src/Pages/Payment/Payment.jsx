import './Payments.css'
import Layout from '../../components/Layout/Layout'
import  { useContext, useState } from "react";
import { DataContext } from '../../components/DataProvider/DataProvider';
import CurrencyFormat from '../../components/Currencyformat/CurrencyFormat';
import { Type } from '../../Utility/ActionType';
import { FadeLoader } from "react-spinners";
import ProductCard from '../../components/product/ProductCard';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { axiosInstance } from '../../Api/axios';
import { useNavigate } from 'react-router-dom';
import {db} from '../../Utility/Firebase'

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1. backend || functions ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // 2. client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log(paymentIntent);

      // 3. after the confirmation --> order firestore database save, clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
     
     {/* header */}
     <div className='payment__header'>
        Checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className='payment'>
        {/* address */}
        <div className='flex'>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>430 kumsa moroda</div>
            <div>Nekemte, Oro</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className='flex'>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className='flex'>
          <h3>choose Payment methods</h3>
          <div className='payment__card__container'>
            <div className='payment__details'>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className='payment__price'>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className='loading'>
                          <FadeLoader color="#36d7b7" size={12}/>
                        <p>Please Wait a moment ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Payment
