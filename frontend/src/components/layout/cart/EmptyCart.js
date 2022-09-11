import React from 'react'
import { Link } from 'react-router-dom'
import "./EmptyCart.css";


const EmptyCart = () => {
    return (
        <div className='main__div'>
            <div className='center__div'>
                <h3>No product in Your Cart </h3>
              
                  <Link   className='btn__empty'  to="/">
                     <button>View Product</button>
                  </Link>

            </div>
            
        </div>
    )
}

export default EmptyCart
