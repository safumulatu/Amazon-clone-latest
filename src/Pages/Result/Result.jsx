import React, { useEffect, useState } from 'react'
import './results.css'
import {useParams} from 'react-router-dom'
import axios  from 'axios'
import Layout from '../../components/Layout/Layout'
import {productUrl} from '../../../src/Api/endPoints'
import ProductCard from '../../components/product/ProductCard'
function Result() {
  const [results, setResults] = useState([]);
  const {categoryName} =useParams()
  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
       setResults(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])
  
  return (
    <Layout> 
 <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
          <div className='products_container'>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
      </section>
    </Layout>
  )
}

export default Result