import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/amazon_PNG11 (2).png';
import ethiflag from '../../assets/10001.jpg';
import './Header.css';
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';

function Header() {
  const [basket] = useContext(DataContext); 
  console.log(basket.length)
  // Destructure basket from context

  return (
    <>
      <section>
        <div className='header__container'>
          <div className='logo__container'>
            <Link to='/'>
              <img src={logo} alt='Amazon' />
            </Link>
            <div className='delivery'>
              <span>
                <LocationOnIcon />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* search section */}
          <div className='search'>
            <select name='' id='' value='' onChange={() => {}}>
              <option value=''>All</option>
              <option value=''>books</option>
              <option value=''>cloths</option>
              <option value=''>the new features of...</option>
              <option value=''>electronics</option>
              <option value=''>jewelery</option>
            </select>
            <input type='text' placeholder='search amazon' />
            <SearchIcon />
          </div>
          {/* other section */}
          <div className='order__container'>
            <Link to='/' className='language'>
              <img src={ethiflag} alt='Ethiopia Flag' />
              <select name='' id='' value='' onChange={() => {}}>
                <option value=''>EN</option>
              </select>
            </Link>
            <Link to='/auth'>
              <div>
                <p>Hello, Sign In</p>
                <span>
                  Account & Lists
                </span>
              </div>
            </Link>
            <Link to='/orders'>
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            <Link to='/cart' className='cart'>
              <BiCart size={35} />
              <span>{basket.length}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
