import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartAction';
import { getProductById } from '../actions/productAction';

import Loader from '../components/Loader';
import Error from '../components/Error';
import Reviews from '../components/Reviews';

const ProductDescScreen = ({ match }) => {
    const [quantity, setQuantity] = useState(1);
    const productid = match.params.id;

    const dispatch = useDispatch();

    const getproductbyidstate = useSelector(state => state.getProductByIdReducer);
    const { product, loading, error } = getproductbyidstate;

    function addToCartFunc() {
        dispatch(addToCart(product, quantity));
    }

    useEffect(() => {
        dispatch(getProductById(productid));
    }, [dispatch, productid])

    return (
        <div className="container">
            {
                loading ? (
                    <Loader />
                )
                    : error ? (
                        <Error error="Something Went Wrong" />
                    )
                        : (
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card p-5 m-3 shadow p-3 mb-5 bg-white rounded">
                                        <h2><b>{product.name}</b></h2>
                                        <hr />
                                        <img src={product.image} alt="Product" className="img-fluid m-3" />
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="m-3 shadow p-3 mb-5 bg-white rounded">
                                        <h1><b>Price: {product.price}</b></h1><hr />
                                        <div className="d-flex">
                                            <h1>Select Quantity: </h1>
                                            <select className="m-auto" value={quantity} onChange={(e) => {
                                                setQuantity(e.target.value)
                                            }}>
                                                {
                                                    [...Array(product.countInStock).keys()].map((v, i) => {
                                                        return <option key={v} value={i + 1}>{i + 1}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <hr />
                                        {product.countInStock > 0 ? (
                                            <button className="btn btn-dark" onClick={addToCartFunc}>Add To Cart</button>
                                        ) : (
                                            <div>
                                                <h2>Out Of Stock</h2>
                                                <button className="btn btn-dark" disabled>Add To Cart</button>
                                            </div>
                                        )}
                                    </div>
                                    <hr />
                                    <Reviews product={product} />
                                </div>
                            </div>
                        )
            }
        </div>
    )
}

export default ProductDescScreen;
