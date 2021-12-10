import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Success from '../components/Success';
import Error from '../components/Error';

import { updateUser } from '../actions/userActions';

const ProfileScreen = () => {
    const loginstate = useSelector(state => state.loginReducer);
    const updateuserstate = useSelector(state => state.updateUserReducer);
    const currentUser = loginstate.currentUser;
    const dispatch = useDispatch();
    const { loading, success, error } = updateuserstate;

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState();
    const [cpassword, setCPassword] = useState();

    function update(e) {
        e.preventDefault();
        if (password === cpassword) {
            const updatedUser = {
                name: name,
                email: email,
                password: password,
            }

            dispatch(updateUser(currentUser._id, updatedUser));
        } else {
            alert('Passwords is not Matched...!');
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 card p-3" style={{
                    marginTop: '150px'
                }}>
                    <div className="div">
                        <h2 className="text-center m-3">Update User:-</h2>
                        {loading && (
                            <Loader />
                        )}
                        {error && (
                            <Error error="Something Went Wrong..." />
                        )}
                        {success && (
                            <Success success="User Update SuccessFully, Please re-login" />
                        )}
                        <form onSubmit={update}>
                            <input
                                type="text"
                                placeholder="Enter Your Name..."
                                required
                                className="form-control"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                            <input
                                type="email"
                                placeholder="Enter Your Email..."
                                required
                                className="form-control"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Enter Your Password..."
                                required
                                className="form-control"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Confirm Your Password..."
                                required
                                className="form-control"
                                value={cpassword}
                                onChange={(e) => {
                                    setCPassword(e.target.value)
                                }}
                            />

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="submit" className="btn mt-3">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen;
