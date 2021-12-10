
//Register New User
export const registerNewUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'USER_REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true
            }
        case 'USER_REGISTER_FALED':
            return {
                ...state,
                loading: true,
                error: 'Email Already Registered'
            }

        default: return state;
    }
}

//Login User
export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true
            }
        case 'USER_LOGIN_FAILED':
            return {
                ...state,
                loading: false,
                error: 'Invalid Credentials'
            }
        case 'USER_LOGOUT':
            return {
                ...state
            }

        default: return state;
    }
}

//Update User
export const updateUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_UPDATE_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'USER_UPDATE_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true
            }
        case 'USER_UPDATE_FALED':
            return {
                ...state,
                loading: false,
                error: 'Email Already Registered'
            }

        default: return state;
    }
}

//get all users for admin panel
export const getAllUsersReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case 'GET_ALLUSERS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'GET_ALLUSERS_SUCCESS':
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case 'GET_ALLUSERS_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default: return state;
    }
}

//delete user by admin
export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_USER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true
            }
        case 'DELETE_USER_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default: return state;
    }
}