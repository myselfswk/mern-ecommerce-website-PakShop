import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';

import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
    const cartreducer = useSelector(state => state.cartReducer);

    const { cartItems } = cartreducer;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    //for logout user
    const dispatch = useDispatch();

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">PAK SHOP</a>
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
                                        <a className="nav-link" href="/login">
                                            Login
                                        </a>
                                    </li>
                                )
                        }

                        {/* Cart */}
                        <li className="nav-item">
                            <a className="nav-link" href="/cart">
                                <i className="fas fa-shopping-cart"></i>
                                {cartItems.length}
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
