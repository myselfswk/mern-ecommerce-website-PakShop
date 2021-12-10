import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../actions/orderActions';

import Error from '../components/Error';
import Loader from '../components/Loader';

const OrderInfo = ({ match }) => {
    const dispatch = useDispatch();
    const orderstate = useSelector(state => state.getOrderByIdReducer);

    const { order, loading, error } = orderstate;

    useEffect(() => {
        dispatch(getOrderById(match.params.orderid))
    }, [dispatch, match.params.orderid])

    return (
        <div className="container">
            {loading && (<Loader />)}
            {error && (<Error error="Something Went Wrong" />)}
            {order && (<div>
                <div className="row justify-content-center mt-3">
                    <div className="col-md-6 card">
                        <h2>Items in your Order</h2>
                        <hr />
                        {order.orderItems.map(item => {
                            return <div key={order._id}>
                                <p>{item.name}</p>
                                <p>Quantity: <b>{item.quantity}</b></p>
                                <p>Price: {item.quantity} x {item.price}: <b>{item.quantity * item.price}/Rps</b></p>
                                <hr />
                            </div>
                        })}
                    </div>
                    <div className="col-md-6 card">
                        <h2>Order Details</h2>
                        <hr />
                        <p>Order ID: <b>{order._id}</b></p>
                        <p>Total Amount: <b>{order.orderAmount}/Rps</b></p>
                        <p>Date of Order: <b>{order.createdAt.substring(0, 10)}</b></p>
                        <p>Transaction ID: <b>{order.transactionId}</b></p>
                        {order.isDelivered ? (
                            <p>Order Status: <b>Order Delivered</b></p>
                        ) : (
                            <p>Order Status: <b>Order Placed</b></p>
                        )
                        }
                        <hr />
                        <div className="card mb-2">
                            <div className="card-body">
                                <h2>Shipping Details</h2>
                                <hr />
                                <p>Address: <b>{order.shippingAddress.address}</b></p>
                                <p>Country: <b>{order.shippingAddress.country}</b></p>
                                <p>City: <b>{order.shippingAddress.city}</b></p>
                                <p>Postal Code: <b>{order.shippingAddress.postalCode}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
            <hr />
            <div className="row">
                <div className="col-md-12 card mb-2">
                    <div className="card-body">
                        <h2>Replacement Conditions</h2>
                        <ul>
                            <li className="text-dark">A free Replacement can't be created for anitem which was returned and replaced once earlier.</li>
                            <li className="text-dark">If your Item isn't eligible for free replacement due to any reason, you can always return it for a refund</li>
                            <li className="text-dark">If the item has missing part or accessories, you may try to contact the manufacturer for assstance. <br />
                                Manufacturer contact information can usually be found on the item packaging or <br /> in the paperwork included with the item.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderInfo;
