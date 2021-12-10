import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct } from '../actions/productAction';

import Success from '../components/Success';
import Error from '../components/Error';
import Loader from '../components/Loader';

const AddNewProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [countInStock, setCountInStock] = useState();
    const [imageurl, setImageurl] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const addproductstate = useSelector(state => state.addProductReducer);
    const { loading, success, error } = addproductstate;

    const addproduct = (e) => {
        e.preventDefault();

        const product = {
            name: name,
            price: price,
            countInStock: countInStock,
            image: imageurl,
            description: description,
            category
        };

        dispatch(addProduct(product));
    };

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-8 shadow p-3 mb-5 bg-white rounded">
                    {loading && (
                        <Loader />
                    )}

                    {success && (
                        <Success success="Product Added Successfully" />
                    )}

                    {error && (
                        <Error error="Something Went Wrong" />
                    )}

                    <h2>Add New Product</h2>
                    <form onSubmit={addproduct}>
                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Enter Product Name"
                            required
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />

                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Enter Product Price"
                            required
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                        />

                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Enter Product Description"
                            required
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />

                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Enter Product Image URL"
                            required
                            value={imageurl}
                            onChange={(e) => {
                                setImageurl(e.target.value)
                            }}
                        />

                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Enter Product Category"
                            required
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                        />

                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Enter Product Count In Stock"
                            required
                            value={countInStock}
                            onChange={(e) => {
                                setCountInStock(e.target.value)
                            }}
                        />

                        <button
                            className="btn mt-5"
                            type="submit"
                        >Add New Product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewProductScreen;
