import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';

import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
    const dispatch = useDispatch();
    const cartreducer = useSelector(state => state.cartReducer);
    const { cartItems } = cartreducer;

    //for logout user (Get user)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <>
            <nav className="navbar navbar-expand-lg px-4">
                <Link className="navbar-brand" to="/">PAK SHOP</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon">
                        <i className="fas fa-bars" style={{ color: 'white' }}></i>
                    </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto">
                        {
                            currentUser ? (
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <i className="fas fa-user"></i> {currentUser.name}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                        <Dropdown.Item href="/order">Order</Dropdown.Item>
                                        <hr />
                                        <Dropdown.Item onClick={() => {
                                            dispatch(logoutUser())
                                        }}>LogOut <i className="fas fa-sign-out-alt" style={{
                                            fontSize: '15px'
                                        }}></i></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )
                                : (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                )
                        }

                        {/* Cart */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="fas fa-shopping-cart"></i>
                                {cartItems.length}
                            </Link>
                        </li>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
