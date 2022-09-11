import React from 'react'
import { Link } from 'react-router-dom'
import "./OrderSuccess.css"

const OrderSuccess = () => {
  return (
    <div className="order__containeer">
        <div className='order__box'>
            <h1>Your Order has been successfully placed</h1>
             <Link className='link' to="/order/me">View Order</Link>
        </div>
    </div>
  )
}

export default OrderSuccess