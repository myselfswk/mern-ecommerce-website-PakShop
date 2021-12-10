import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';

import Error from '../components/Error';
import Loader from '../components/Loader';

const LoginScreen = () => {
    const loginreducer = useSelector(state => state.loginReducer);
    const { loading, error } = loginreducer;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    function login(e) {
        e.preventDefault();
        const user = {
            email: email,
            password: password
        }
        dispatch(loginUser(user));
    }

    useEffect(() => {
        if (localStorage.getItem('currentUser')) {
            window.location.href = '/';
        }
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center p-2">
                <div className="col-md-6 card p-3 shadow p-3 mb-5 bg-white rounded" style={{
                    marginTop: '100px'
                }}>
                    <div className="div">
                        <h2 className="text-center m-3" style={{ display: 'inline' }}>Login User</h2>
                        <i className="fas fa-sign-in-alt" style={{ fontSize: '30px' }}></i>
                        {error && (
                            <Error error="Invalid Credentials" />
                        )}
                        {loading && (
                            <Loader />
                        )}
                        <form onSubmit={login}>
                            <input type="email" placeholder="Enter Your Email..." required className="form-control" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                            <input type="password" placeholder="Enter Your Password..." required className="form-control" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }} />

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="submit" className="btn mt-3">LOGIN</button>
                            </div>
                        </form>
                    </div>
                    <a href="/register" className="m-3" style={{
                        color: 'black',
                        textDecoration: 'none'
                    }}><b>Click Here To Register</b></a>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
