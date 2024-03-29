import './App.scss'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { PreduContextProvider } from './PreduContext';

import Header from './Components/Header';
import Footer from './Components/Footer';
import ChatBot from './Components/ChatBot';
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';
import Cart from './Pages/Cart/Cart';
import Product from './Pages/Product/Product';
import User from './Pages/User/User';
import Order from './Pages/Order/Order';
import OrderDetails from './Pages/OrderDetails/OrderDetails';
import Help from './Pages/Help/Help';
import AboutUs from './Pages/AboutUs/AboutUs';

import Admin from './Pages/Admin/Admin';
import AdminHeader from './Pages/Admin/components/AdminHeader/AdminHeader';
import AdminUsers from './Pages/Admin/components/AdminUsers/AdminUsers';
import AdminProducts from './Pages/Admin/components/AdminProducts/AdminProducts';
import AdminCoupons from './Pages/Admin/components/AdminCoupons/AdminCoupons';
import AdminOrders from './Pages/Admin/components/AdminOrders/AdminOrders';
import AdminOrderDetails from './Pages/Admin/components/AdminOrderDetails/AdminOrderDetails';


function App() {
  return (
    <div className="App">
      <PreduContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/Home"/>} />
            <Route exact path='/Home' element={<><Header/><Home/><Footer/><ChatBot/></>}/>
            <Route exact path='/Shop' element={<><Header/><Shop/><Footer/><ChatBot/></>}/>
            <Route exact path='/Cart' element={<><Header/><Cart/><Footer/><ChatBot/></>}/>
            <Route exact path='/Order' element={<><Header/><Order/><Footer/><ChatBot/></>}/>
            <Route exact path='/Product' element={<><Header/><Product/><Footer/><ChatBot/></>}/>
            <Route exact path='/OrderDetails' element={<><Header/><OrderDetails/><Footer/><ChatBot/></>}/>
            <Route exact path='/Help' element={<><Header/><Help/><Footer/><ChatBot/></>}/>
            <Route exact path='/AboutUs' element={<><Header/><AboutUs/><Footer/><ChatBot/></>}/>
            <Route exact path='/User' element={<><User/></>}/>
            <Route exact path='/Admin' element={<><AdminHeader/><Admin/></>}/>
            <Route exact path='/Admin/Users' element={<><AdminHeader/><AdminUsers/></>}/>
            <Route exact path='/Admin/Products' element={<><AdminHeader/><AdminProducts/></>}/>
            <Route exact path='/Admin/Coupons' element={<><AdminHeader/><AdminCoupons/></>}/>
            <Route exact path='/Admin/Orders' element={<><AdminHeader/><AdminOrders/></>}/>
            <Route exact path='/Admin/OrderDetails' element={<><AdminHeader/><AdminOrderDetails/></>}/>
          </Routes>
        </Router>
      </PreduContextProvider>
    </div>
  );
}

export default App;
