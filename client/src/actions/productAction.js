import axios from 'axios';

//get all product
export const getAllProducts = () => dispatch => {
    dispatch({
        type: 'GET_PRODUCTS_REQUEST'
    })

    axios.get('/api/products/getallproducts').then(res => {
        dispatch({
            type: 'GET_PRODUCTS_SUCCESS',
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: 'GET_PRODUCTS_FAILED',
            payload: err
        })
    })
}

//get product by id
export const getProductById = (productid) => dispatch => {
    dispatch({
        type: 'GET_PRODUCTBYID_REQUEST'
    })

    axios.post('/api/products/getproductbyid', { productid }).then(res => {
        dispatch({
            type: 'GET_PRODUCTBYID_SUCCESS',
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: 'GET_PRODUCTBYID_FAILED',
            payload: err
        })
    })
}

//Filter Products
export const filterProducts = (searchKey, sortKey, category) => dispatch => {
    var filteredPoducts;
    dispatch({
        type: 'GET_PRODUCTS_REQUEST'
    })

    axios.get('/api/products/getallproducts').then(res => {
        filteredPoducts = res.data;
        if (searchKey) {
            filteredPoducts = res.data.filter(product => {
                return product.name.toLowerCase().includes(searchKey)
            })
        }

        //search by high to low and low to high
        if (sortKey !== 'popular') {
            //descending order
            if (sortKey === 'htl') {
                filteredPoducts = res.data.sort((a, b) => {
                    return -a.price + b.price
                })
            } else { //ascending order
                filteredPoducts = res.data.sort((a, b) => {
                    return a.price - b.price
                })
            }
        }

        //search by catagory
        if (category !== 'all') {
            filteredPoducts = res.data.filter(product => {
                return product.Category.toLowerCase().includes(category)
            })
        }

        //call success, if all is correct
        dispatch({
            type: 'GET_PRODUCTS_SUCCESS',
            payload: filteredPoducts
        })

    }).catch(err => {
        dispatch({
            type: 'GET_PRODUCTS_FAILED'
        })
    })
}

//Submit Reviews action
export const addProductReview = (review, productid) => (dispatch, getState) => {
    dispatch({
        type: 'ADD_PRODUCT_REVIEW_REQUEST'
    })
    const currentUser = getState().loginReducer.currentUser;

    axios.post('/api/products/addreview', {
        review,
        productid,
        currentUser
    }).then(res => {
        dispatch({
            type: 'ADD_PRODUCT_REVIEW_SUCCESS' + res
        })
        alert('Your Review Submitted Successfully');
        window.location.reload();
    }).catch(err => {
        dispatch({
            type: 'ADD_PRODUCT_REVIEW_FAILED' + err
        })
    })
}

//delete product by admin
export const deleteProduct = (productid) => dispatch => {
    dispatch({
        type: 'DELETE_PRODUCT_REQUEST'
    })

    axios.post('/api/products/deleteproduct', {
        productid
    }).then(res => {
        dispatch({
            type: 'DELETE_PRODUCT_SUCCESS',
            payload: res.data
        })
        alert("Product Deleted Successfully");
        window.location.reload();
    }).catch(err => {
        dispatch({
            type: 'DELETE_PRODUCT_FAILED',
            payload: err
        })
    })
}

//Add new product by admin
export const addProduct = (product) => dispatch => {
    dispatch({
        type: 'ADD_PRODUCT_REQUEST'
    })

    axios.post('/api/products/addproduct', {
        product
    }).then(res => {
        dispatch({
            type: 'ADD_PRODUCT_SUCCESS'
        })
        window.location.reload();
    }).catch(err => {
        dispatch({
            type: 'ADD_PRODUCT_FAILED'
        })
    })
}

//Update product by admin
export const updateProduct = (productid, updatedproduct) => dispatch => {
    dispatch({
        type: 'UPDATE_PRODUCT_REQUEST'
    })

    axios.post('/api/products/updateproduct', {
        productid,
        updatedproduct
    }).then(res => {
        dispatch({
            type: 'UPDATE_PRODUCT_SUCCESS'
        })
        window.location.href = '/admin/productslist';
    }).catch(err => {
        dispatch({
            type: 'UPDATE_PRODUCT_FAILED'
        })
    })
}
