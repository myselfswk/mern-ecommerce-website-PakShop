import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ProductDescScreen from './screens/ProductDescScreen';
import CartScreen from './screens/CartScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import OrdersScreen from './screens/OrdersScreen';
import OrderInfo from './screens/OrderInfo';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/product/:id" component={ProductDescScreen} />
        <Route path="/cart" component={CartScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/order" component={OrdersScreen} />
        <Route path="/orderinfo/:orderid" component={OrderInfo} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/admin" component={AdminScreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
