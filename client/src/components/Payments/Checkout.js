import React from 'react'
import StripeCheckout from 'react-stripe-checkout'




export default function Checkout({ total }) {

//   const orderstate = useSelector((state) => state.placeOrderReducer)
//   const { loading, error, success } = orderstate
//   const dispatch = useDispatch()

//   function tokenHandler(token) {
//     dispatch(placeOrder(token, total))
//   }

  return (
    <div>
      <StripeCheckout
        amount={total * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey='pk_test_51KxR3MIC2E0K0mYHN4a2mYK3zETDNxJVZPhLZ19tDCGfHzSzOtu9u0dJFz28ZyZe3AMh0nBlySOwWIHwbY0LUJRM00P1aj1dUp'
        currency='LKR'
      >

        <button className='btn btn-outline-success'>Pay Now</button>
      </StripeCheckout>
    </div>
  )
}