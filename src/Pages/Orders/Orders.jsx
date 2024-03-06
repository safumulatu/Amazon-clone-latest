import  { useContext, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import './order.css'
import {db} from '../../Utility/Firebase'
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/product/ProductCard";
import './DateTimeDisplay'
import DateTimeDisplay from "./DateTimeDisplay";
function Orders() {
  const [{ user },] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <Layout>
      <section className='container'>
        <div className='orders__container'>
          <h2>Your Orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>you don't have orders yet.</div>
          )}
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} product={order} key={order.id} />
                  ))}
                    <DateTimeDisplay/>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
