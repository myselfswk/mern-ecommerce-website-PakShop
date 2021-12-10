import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../actions/orderActions';

import Loader from './Loader';
import Success from './Success';
import Error from './Error';

const CheckOut = ({ amount }) => {
    const dispatch = useDispatch();
    const orderstate = useSelector(state => state.placeOrderReducer);
    const { loading, success, error } = orderstate;

    function tokenHandler(token) {
        dispatch(placeOrder(token, amount));
    }

    function validate() {
        if (!localStorage.getItem('currentUser')) {
            window.location.href = '/login';
        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            {success && (<Success success="Your Order Placed Successfully" />)}
            {error && (<Error error="Something Went Wrong" />)}
            <StripeCheckout
                token={tokenHandler}
                amount={amount * 100}
                shippingAddress
                currency="PKR"
                stripeKey="pk_test_51JeH61B1Uwej0352nvgypQa8AdK2n9hj6Aae3lbYSTOJm1xtN9Musfjz2d6QsCmF8k8HKuBfbnVWzlxjSl2Maaah00NMVmg5FK"
            >
                <button className="btn" onClick={validate}>PAY NOW</button>
            </StripeCheckout>
        </div>
    )
}

export default CheckOut;
