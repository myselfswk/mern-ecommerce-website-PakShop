import React, { useState } from 'react';
import Rating from 'react-rating';
import { useDispatch } from 'react-redux';
import { addProductReview } from '../actions/productAction';

const Reviews = ({ product }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    function sendReview() {
        if (localStorage.getItem('currentUser')) {
            //check weather user already review or not
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var alreadyReviewed;

            for (var i = 0; i < product.reviews.length; i++) {
                if (product.reviews[i].userid === currentUser._id) {
                    alreadyReviewed = true;
                }
            }

            if (alreadyReviewed) {
                alert("You've Already Reviewed this Product");
            } else {
                const review = {
                    rating: rating,
                    comment: comment
                }

                dispatch(addProductReview(review, product._id))
            }
        } else {
            window.location.href = '/login';
        }
    }

    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            <h2>Give Your Review</h2>
            <Rating
                style={{ color: 'orange' }}
                initialRating={rating}
                emptySymbol="far fa-star"
                fullSymbol="fa fa-star"
                onChange={(e) => {
                    setRating(e)
                }}
            />
            <input
                type="text"
                className="form-control"
                value={comment}
                placeholder="Add a Comment..."
                onChange={(e) => {
                    setComment(e.target.value)
                }}
            />
            <button className="btn mt-3" onClick={sendReview}>Submit Your Reviews</button>
            <hr />

            <h2>Latest Reviews</h2>
            {
                product.reviews && (
                    product.reviews.map(review => {
                        return <div key={review.userid}>
                            <Rating
                                style={{ color: 'orange' }}
                                initialRating={review.rating}
                                emptySymbol="far fa-star"
                                fullSymbol="fa fa-star"
                                readonly
                            />
                            <p>{review.comment}</p>
                            <p>BY: {review.name}</p>
                            <hr />
                        </div>
                    })
                )
            }
        </div>
    )
}

export default Reviews;
