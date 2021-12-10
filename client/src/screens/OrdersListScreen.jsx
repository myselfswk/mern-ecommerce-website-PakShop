import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllOrders } from '../actions/orderActions';

import Error from '../components/Error';
import Loader from '../components/Loader';

const OrdersListScreen = () => {
    const getordersstate = useSelector(state => state.getAllOrdersReducer);
    const { loading, error, orders } = getordersstate;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch])

    return (
        <div>
            <h2>Orders List</h2>

            <table className="table table-bordered table-striped table-hover table-responsive-sm">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User Email</th>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Transaction ID</th>
                    </tr>
                </thead>

                <tbody>
                    {loading && (
                        <tr><td><Loader /></td></tr>
                    )}
                    {error && (
                        <tr><td><Error error="Something Went Wrong" /></td></tr>
                    )}
                    {orders && (orders.map(order => {
                        return <tr key={order._id} style={{ cursor: 'pointer' }} onClick={() => {
                            window.location.href = `/orderinfo/${order._id}`
                        }}>
                            <td>{order._id}</td>
                            <td>{order.email}</td>
                            <td>{order.userid}</td>
                            <td>{order.orderAmount}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.transactionId}</td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersListScreen;
