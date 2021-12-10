import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from '../actions/userActions';

import Error from '../components/Error';
import Loader from '../components/Loader';
import Success from '../components/Success';

const RegisterScreen = () => {
    const registerstate = useSelector(state => state.registerNewUserReducer);
    const { loading, success, error } = registerstate;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const dispatch = useDispatch();

    function register(e) {
        e.preventDefault();
        const user = {
            name: name,
            email: email,
            password: password
        }

        if (password === cpassword) {
            dispatch(registerNewUser(user))
        } else {
            alert("Passwords not matched");
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center p-2">
                <div className="col-md-6 card p-3 shadow p-3 mb-5 bg-white rounded" style={{
                    marginTop: '100px'
                }}>
                    <div className="div">
                        <h2 className="text-center m-3" style={{ display: 'inline' }}>Register User</h2>
                        <i className="fas fa-user-plus" style={{ fontSize: '30px' }}></i>
                        {loading && (
                            <Loader />
                        )}
                        {error && (
                            <Error error="Email Address is Already Registered..." />
                        )}
                        {success && (
                            <Success success="User Register SuccessFully..." />
                        )}
                        <form onSubmit={register}>
                            <input type="text" placeholder="Enter Your Name..." required className="form-control" value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} />
                            <input type="email" placeholder="Enter Your Email..." required className="form-control" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                            <input type="text" placeholder="Enter Your Password..." required className="form-control" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                            <input type="text" placeholder="Enter Confirm Your Password..." required className="form-control" value={cpassword} onChange={(e) => {
                                setCPassword(e.target.value)
                            }} />

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="submit" className="btn mt-3">REGISTER</button>
                            </div>
                        </form>
                    </div>
                    <a href="/login" className="m-3" style={{
                        color: 'black',
                        textDecoration: 'none'
                    }}><b>Click Here To Register</b></a>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen;
