import Layout from '../components/Layout'
import { useState,useEffect } from 'react'
import axios from 'axios'
export default function OrdersPage (){
  const [orders,setOrders] = useState([])
  useEffect(() => {
    axios.get('/api/orders/').then(response => {
      setOrders(response.data)
    })
  },[])
  return (
    <Layout>
      <h1>訂單</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>日期</th>
            <th>收據</th>
            <th>產品</th>
          </tr>
        </thead>
        <tbody>
        {orders.length > 0 && orders.map(order => (
          <tr>
            <td>{(new Date(order.createdAt)).toLocaleString()}</td>
            <td>
              {order.name} {order.email}<br/>
              {order.city} {order.postalCode}
              {order.country}<br/>
              {order.streetAddress}
            </td>
            <td>
              {order.line_items.map (l => (
                <>
                  {l.price_data?.product_data.name} x
                  {l.quantity}<br/>
            
                </>
              ))}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </Layout>
  )
}