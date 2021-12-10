import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productAction';

import Error from '../components/Error';
import Filter from '../components/Filter';
import Loader from '../components/Loader';
import Product from '../components/Products'

const HomeScreen = () => {

    const getallproductsstate = useSelector(state => state.getAllProductsReducer);
    const { loading, products, error } = getallproductsstate;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])
    return (
        <div className="container">
            <Filter />
            <hr />
            <div className="row justify-content-center mt-5 ml-2 mr-2">
                {
                    loading ? (
                        <Loader />
                    ) : error ? (
                        <Error error="Something Went Wrong..." />
                    ) : (
                        products.map(product => {
                            return <div key={product._id} className="col-md-3 card shadow p-3 mb-5 bg-white rounded m-4 p-2">
                                <Product product={product} />
                            </div>
                        })
                    )
                }
            </div>
        </div>
    )
}

export default HomeScreen;
