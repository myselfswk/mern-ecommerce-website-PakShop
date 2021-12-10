import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductById, updateProduct } from '../actions/productAction';

import Error from '../components/Error';
import Loader from '../components/Loader';
import Success from '../components/Success';

const EditProductScreen = ({ match }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [countInStock, setCountInStock] = useState();
    const [imageurl, setImageurl] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const productstate = useSelector((state) => state.getProductByIdReducer);
    const updateproductstate = useSelector((state) => state.updateProductReducer)

    const { product, error, loading } = productstate;
    const { success, updateerror, updateloading } = updateproductstate;

    function editProduct(e) {
        e.preventDefault();

        const updatedProduct = {
            name: name,
            price: price,
            countInStock: countInStock,
            image: imageurl,
            description: description,
            category
        };

        dispatch(updateProduct(match.params.productid, updatedProduct));
    }

    useEffect(() => {
        if (product) {
            if (product._id === match.params.productid) {
                setName(product.name);
                setPrice(product.price);
                setCountInStock(product.countInStock);
                setImageurl(product.image);
                setCategory(product.Category);
                setDescription(product.description);
            } else {
                dispatch(getProductById(match.params.productid));
            }
        } else {
            dispatch(getProductById(match.params.productid));
        }
    }, [dispatch, product, match.params.productid])

    return (
        <div>
            <h2>Edit Product</h2>

            {loading && (<Loader />)}

            {updateloading && (<Loader />)}

            {updateerror && (<Error error="Something Went Wrong" />)}

            {success && (<Success success="Product Update Successfully" />)}

            {error && (<Error error="Something Went Wrong" />)}

            {product && (
                <div>
                    <form onSubmit={editProduct}>
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
                        >Edit Product</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default EditProductScreen;
