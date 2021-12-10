import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllProducts, deleteProduct } from '../actions/productAction';

import Loader from '../components/Loader';
import Error from '../components/Error';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const getallproductsstate = useSelector(state => state.getAllProductsReducer);
    const { products, loading, error } = getallproductsstate;

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    return (
        <div>
            <h2>Product List</h2>

            <table className="table table-bordered table-striped table-hover table-responsive-sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {loading && (
                        <tr><td><Loader /></td></tr>
                    )}

                    {error && (
                        <tr><td><Error error="Something Went Wrong" /></td></tr>
                    )}
                    {products && (products.map(product => {
                        return <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.countInStock}</td>
                            <td>{product._id}</td>
                            <td>
                                <i className="fas fa-trash-alt fa-del" style={{marginRight: '10px'}} onClick={() => {
                                    dispatch(deleteProduct(product._id))
                                }}>
                                </i>
                                <Link to={`/admin/editproduct/${product._id}`}>
                                    <i className="fas fa-edit"></i>
                                </Link>
                            </td>
                        </tr>
                    }))}

                </tbody>
            </table>
        </div>
    )
}

export default ProductListScreen;
