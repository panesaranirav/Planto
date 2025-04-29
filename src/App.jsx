import './App.css'
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { CartProvider } from './Context/CartContext';
import { ToastContainer } from 'react-toastify';
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Plants from "./Pages/Plants";
import More from "./Pages/More";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import Cart from './Pages/Cart';
import Topselling from './Components/Topselling';

function App() {
return (
    <>
    <div className="app-container">
    <CartProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/more" element={<More />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </CartProvider>
    </div>
  </>
  )
}

export default App
