import Category from '../../components/catagory/Category'
import Product from '../../components/product/Product'
import CarouselEffect from "../../components/carousel/CarouselEffect"
import Layout from '../../components/Layout/Layout'

function Landing() {
  return (
      <Layout>
      <CarouselEffect/>
      <Category/>
      <Product/>
      </Layout>
  )
}

export default Landing
