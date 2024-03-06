import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing';
import Cart from './Pages/Cart/Cart';
import Result from './Pages/Result/Result';
import ProductDetail from './Pages/ProductDetails/ProductDetails';
import Auth from './Pages/Auth/Auth';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";
import Orders from "./Pages/Orders/Orders";
import Payment from '../src/Pages/Payment/Payment'


const stripePromise = loadStripe("pk_test_51OogqYAL7YJJv7AVNoSlbh0POyEyIwaVzXpHjbksRV4lALC403T5foaLE80GAEZ0avS9u9LN0XgSxkJayWZZxrV600Th3VbHL1");
function Routing() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/payments" element={
            <ProtectedRoute
              msg={".❌❌❌ you have to log in for finish your payments"}
              redirect={"/payments"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
          <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must log in to access your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
          <Route path="/category/:categoryName" element={<Result />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;
