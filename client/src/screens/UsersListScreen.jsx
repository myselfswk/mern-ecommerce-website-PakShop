import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, getAllUsers } from '../actions/userActions';

import Error from '../components/Error';
import Loader from '../components/Loader';

const UsersListScreen = () => {
    const dispatch = useDispatch();
    const getallusersstate = useSelector(state => state.getAllUsersReducer);
    const { users, loading, error } = getallusersstate;

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    return (
        <div>
            <h2>Users List</h2>
            <table className="table table-bordered table-striped table-hover table-responsive-sm">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr><td><Loader /></td></tr>
                    )}

                    {error && (
                        <tr><td><Error error="Something Went Wrong" /></td></tr>
                    )}

                    {users && (
                        users.map(user => {
                            return <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><i className="fas fa-trash-alt fa-del" onClick={() => {
                                    dispatch(deleteUser(user._id))
                                }}></i></td>
                            </tr>
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UsersListScreen;
