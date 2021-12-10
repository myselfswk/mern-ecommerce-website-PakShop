import React, { useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import AddNewProductScreen from './AddNewProductScreen';
import EditProductScreen from './EditProductScreen';
import OrdersListScreen from './OrdersListScreen';
import ProductListScreen from './ProductListScreen';
import UsersListScreen from './UsersListScreen';

const AdminScreen = () => {
    const currUser = localStorage.getItem('currentUser');
    if (currUser === null) {
        window.location.href = '/';
    }
    const cUser = JSON.parse(currUser);

    useEffect(() => {
        if (cUser.email !== "waleed1999@gmail.com") {
            window.location.href = '/';
        }
    }, [cUser.email]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-2">
                <div className="col-md-12">
                    <h2>Admin Panel</h2>
                    <ul className="ul-admin p-2">
                        <li className="li-admin">
                            <Link to="/admin/userslist" className="li-admin-link">
                                Users List
                            </Link>
                        </li>
                        <li className="li-admin">
                            <Link to="/admin/productslist" className="li-admin-link">
                                Product List
                            </Link>
                        </li>
                        <li className="li-admin">
                            <Link to="/admin/addnewproduct" className="li-admin-link">
                                Add New Product
                            </Link>
                        </li>
                        <li className="li-admin">
                            <Link to="/admin/orderslist" className="li-admin-link">
                                Orders List
                            </Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/admin/userslist" component={UsersListScreen} />
                        <Route path="/admin/productslist" component={ProductListScreen} />
                        <Route path="/admin/addnewproduct" component={AddNewProductScreen} />
                        <Route path="/admin/orderslist" component={OrdersListScreen} />
                        <Route path="/admin/editproduct/:productid" component={EditProductScreen} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default AdminScreen;
