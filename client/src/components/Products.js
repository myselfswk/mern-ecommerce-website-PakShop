import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';

const Products = ({ product }) => {
    return (
        <div>
            <Link to={`/product/${product._id}`} className="text-decoration-none">
                <img src={product.image} alt="product" className="img-fluid" />
                {/* align-text-bottom ---> to bottom the text */}
                <h1 className="text-center">{product.name}</h1>
                <Rating
                    style={{ color: 'orange' }}
                    initialRating={product.rating}
                    emptySymbol="far fa-star"
                    fullSymbol="fa fa-star"
                    readonly={true}
                />
                <h1 className="text-center">Price: {product.price} Rps/-</h1>
            </Link>
        </div>
    )
}

export default Products;
