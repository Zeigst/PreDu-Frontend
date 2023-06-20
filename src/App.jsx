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
import Admin from './Pages/Admin/Admin';


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
            <Route exact path='/Product' element={<><Header/><Product/><Footer/></>}/>
            <Route exact path='/User' element={<><User/></>}/>
            <Route exact path='/Admin' element={<><Admin/></>}/>

          </Routes>
        </Router>
      </PreduContextProvider>
    </div>
  );
}

export default App;
