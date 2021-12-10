import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartAction';
import CheckOut from '../components/CheckOut';

const CartScreen = () => {
    const cartreducerstate = useSelector(state => state.cartReducer);
    const { cartItems } = cartreducerstate;

    var subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const dispatch = useDispatch();

    return (
        <div className="container">
            <div className="row mt-3 justify-content-center">
                <div className="col-md-8 card text-center shadow p-3 mb-5 bg-white rounded">
                    <h2 className="text-center m-5">MY CART</h2>
                    <table className="table table-bordered table-hover table-responsive">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                cartItems.map(item => {
                                    return <tr>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <select value={item.quantity} onChange={
                                                (e) => {
                                                    dispatch(addToCart(item, e.target.value))
                                                }
                                            }>
                                                {
                                                    [...Array(item.countInStock).keys()].map((x, i) => {
                                                        return <option value={i + 1}>{i + 1}</option>
                                                    })
                                                }
                                            </select>
                                        </td>
                                        <td>{item.price * item.quantity}</td>
                                        <td><i className="fas fa-trash-alt fa-del" onClick={() => dispatch(deleteFromCart(item))}></i></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <hr />
                    <h2 className="text-center">SubTotal: {subtotal} Rps/-</h2>
                    <hr />
                    <CheckOut amount={subtotal} />
                </div>
            </div>
        </div>
    )
}

export default CartScreen;
