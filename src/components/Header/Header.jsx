import  { useContext } from "react";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";
import logo from '../../assets/logo.png'
import './Header.css'
import americaflag from '../../assets/americaflag.png'
import { auth } from "../../Utility/Firebase";

const TestHead = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className='fixed'>
      <section>
        <div className='header__container'>
          {/* logo section */}
          <div className='logo__container'>
            <Link to="/">
              <img
                src={logo}
                alt="amazon logo"
              />
            </Link>
            <div className='delivery'>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* search section */}
          <div className='search'>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={38} />
          </div>
          {/* other section */}
          <div className='order__container'>
            <Link to="" className='language'>
              <img
                src={americaflag}
                alt="american flag"
              />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => (user ? auth.signOut() : null)}>
                      Sign Out
                    </span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            <div className="cart-flex">
            <Link to="/cart" className='cart'>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
            </div>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default TestHead;
