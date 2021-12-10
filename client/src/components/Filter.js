import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import { filterProducts } from '../actions/productAction';

const Filter = () => {
    const [searchKey, setSearchKey] = useState('');
    const [sort, setSort] = useState('popular');
    const [category, setCategory] = useState('all');

    const dispatch = useDispatch();

    return (
        <div className="container">
            <div className="row justify-content-center shadow p-3 mb-5 bg-white rounded filter-menu">
                <div className="col-md-3 ml-2" style={{ marginTop: '7px' }}>
                    <input
                        value={searchKey}
                        onChange={(e) => {
                            setSearchKey(e.target.value)
                        }}
                        type="text"
                        placeholder="Search Products"
                        className="form-control"
                    />
                </div>
                <div className="col-md-2 mt-3 ml-2">
                    <select
                        style={{ cursor: 'pointer' }}
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value)
                        }}
                        className="form-control"
                    >
                        <option value="popular">Popular</option>
                        <option value="htl">High To Low</option>
                        <option value="lth">Low To High</option>
                    </select>
                </div>
                <div className="col-md-2 mt-3 ml-2">
                    <select
                        style={{ cursor: 'pointer' }}
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                        className="form-control"
                    >
                        <option value="all">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="mobiles">Mobiles</option>
                        <option value="games">Games</option>
                    </select>
                </div>
                <div className="col-md-2 mt-3 ml-2">
                    <button className="btn" onClick={() => {
                        dispatch(filterProducts(searchKey, sort, category))
                    }}>Filter</button>
                </div>
            </div>
        </div>
    )
}

export default Filter;
