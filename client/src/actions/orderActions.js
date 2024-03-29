import axios from 'axios';

// Place order
export const placeOrder = (token, subtotal) => (dispatch, getState) => {
    const currentUser = getState().loginReducer.currentUser;
    const demoItems = getState().cartReducer.cartItems;
    const cartItems = [];

    for (var i = 0; i < demoItems.length; i++) {
        var item = {
            name: demoItems[i].name,
            quantity: demoItems[i].quantity,
            price: demoItems[i].price,
            _id: demoItems[i]._id
        }

        cartItems.push(item);
    }

    dispatch({
        type: 'PLACE_ORDER_REQUEST'
    })

    axios.post('/api/orders/placeorder', {
        token,
        subtotal,
        currentUser,
        cartItems
    }).then(res => {
        dispatch({
            type: 'PLACE_ORDER_SUCCESS' + res
        })
    }).catch(err => {
        dispatch({
            type: 'PLACE_ORDER_FAILED' + err
        })
    })
}

//retrieve data to show on order screen as list
export const getOrdersByUserId = () => (dispatch, getState) => {
    const userid = getState().loginReducer.currentUser._id;

    dispatch({
        type: 'GET_ORDERSBYUSERID_REQUEST'
    })
    axios.post('/api/orders/getordersbyuserid', {
        userid: userid
    }).then(res => {
        dispatch({
            type: 'GET_ORDERSBYUSERID_SUCCESS',
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: 'GET_ORDERSBYUSERID_FAILED',
            payload: err
        })
    })
}

//show order details
export const getOrderById = (orderid) => (dispatch, getState) => {
    dispatch({
        type: 'GET_ORDERBYID_REQUEST'
    })
    axios.post('/api/orders/getorderbyid', {
        orderid: orderid
    }).then(res => {
        dispatch({
            type: 'GET_ORDERBYID_SUCCESS',
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: 'GET_ORDERBYID_FAILED',
            payload: err
        })
    })
}

//show order details to admin panel
export const getAllOrders = () => (dispatch, getState) => {
    dispatch({
        type: 'GET_ALLORDERS_REQUEST'
    })
    axios.get('/api/orders/getallorders').then(res => {
        dispatch({
            type: 'GET_ALLORDERS_SUCCESS',
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: 'GET_ALLORDERS_FAILED',
            payload: err
        })
    })
}