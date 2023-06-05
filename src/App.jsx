import './App.scss'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { PreduContextProvider } from './PreduContext';

import Header from './Components/Header';
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';

function App() {
  return (
    <div className="App">
      <PreduContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/Home"/>} />
            <Route exact path='/Home' element={<><Header/><Home/></>}/>
            <Route exact path='/Shop' element={<><Header/><Shop/></>}/>
          </Routes>
        </Router>
      </PreduContextProvider>
    </div>
  );
}

export default App;
