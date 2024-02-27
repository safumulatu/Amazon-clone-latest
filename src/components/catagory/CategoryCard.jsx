import React from 'react'
import './cata.css'
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';


function CategoryCard({data}) {
  const addToCart = ()=>{
    dispatch({
        type:Type.ADD_TO_BASKET,
        item:{
            image, title, id, rating, price,description
        }
    })
  }

  return (
    <div className='category'>

        <Link to={`/category/${data.name}`}>
            <span>
                <h2>{data?.title}</h2>
            </span>
            <img src={data?.image} alt="" />
            <p onClick={addToCart}>shop now</p>
        </Link>
    </div>
  )
}

export default CategoryCard