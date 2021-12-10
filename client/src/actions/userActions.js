import axios from 'axios';

//Register New User
export const registerNewUser = (user) => dispatch => {
    dispatch({
        type: 'USER_REGISTER_REQUEST'
    })

    axios.post('/api/users/register', user).then(res => {
        dispatch({
            type: 'USER_REGISTER_SUCCESS' + res
        })
    }).catch(err => {
        dispatch({
            type: 'USER_REGISTER_FAILED',
            payload: err
        })
    })
}

//Login User
export const loginUser = (user) => dispatch => {
    dispatch({
        type: 'USER_LOGIN_REQUEST'
    })

    axios.post('/api/users/login', user).then(res => {
        dispatch({
            type: 'USER_LOGIN_SUCCESS'
        })

        localStorage.setItem('currentUser', JSON.stringify(res.data));
        window.location.href = '/';
    }).catch(err => {
        dispatch({
            type: 'USER_LOGIN_FAILED',
            payload: err
        })
    })
}

//User LogOut
export const logoutUser = () => dispatch => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cartItems');

    dispatch({
        type: 'USER_LOGOUT'
    })

    window.location.href = '/login';
}

//Update User
export const updateUser = (userid, updateduser) => dispatch => {
    dispatch({
        type: 'USER_UPDATE_REQUEST'
    })

    axios.post('/api/users/update', {
        userid,
        updateduser
    }).then(res => {
        dispatch({
            type: 'USER_UPDATE_SUCCESS' + res
        })
        window.location.reload();
    }).catch(err => {
        dispatch({
            type: 'USER_UPDATE_FAILED',
            payload: err
        })
    })
}

//get all users for admin panel
export const getAllUsers = () => dispatch => {
    dispatch({
        type: 'GET_ALLUSERS_REQUEST'
    })

    axios.get('/api/users/getallusers').then(res => {
        dispatch({
            type: 'GET_ALLUSERS_SUCCESS',
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: 'GET_ALLUSERS_FAILED',
            payload: err
        })
    })
}

//delete user by admin
export const deleteUser = (userid) => dispatch => {
    dispatch({
        type: 'DELETE_USER_REQUEST'
    })

    axios.post('/api/users/deleteuser', {
        userid
    }).then(res => {
        dispatch({
            type: 'DELETE_USER_SUCCESS',
            payload: res.data
        })
        alert("User Deleted Successfully");
        window.location.reload();
    }).catch(err => {
        dispatch({
            type: 'DELETE_USER_FAILED',
            payload: err
        })
    })
}