import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOrdersByUserId } from '../actions/orderActions';

import Loader from '../components/Loader';
import Error from '../components/Error';

const OrdersScreen = () => {
    const dispatch = useDispatch();
    const orderstate = useSelector(state => state.getOrdersByUserIdReducer);

    const { orders, error, loading } = orderstate;

    useEffect(() => {
        if (localStorage.getItem('currentUser')) {
            dispatch(getOrdersByUserId());
        } else {
            window.location.href = '/login';
        }
    }, [dispatch])

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-10">
                    <h2>MY ORDERS</h2>
                    <table className="table table-striped table-hover table-responsive">
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>AMOUNT</th>
                                <th>DATE</th>
                                <th>TRANSACTION ID</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr><td><Loader /></td></tr>
                            )}
                            {orders && (orders.map(order => {
                                return <tr key={order._id} onClick={() => {
                                    window.location.href = `/orderinfo/${order._id}`
                                }}>
                                    <td>{order._id}</td>
                                    <td>{order.orderAmount}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.transactionId}</td>
                                    <td>{order.isDelivered ? (
                                        <p>Delivered</p>
                                    ) : (
                                        <p>Order Placed</p>
                                    )
                                    }</td>
                                </tr>
                            }))}
                            {error && (
                                <tr><td><Error error="Something Went Wrong" /></td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrdersScreen;
