import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// Import komponen
import Home from './pages/Home';
import About from './pages/about';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import Overview from './pages/Overview';
import Stats from './pages/Stats';
import Users from './pages/User';
import UserDetails from './pages/UserDetails';
import Counter from './assets/counter'; // Pastikan ini adalah file komponen Counter
import Component from './Component.jsx'
import ThemeProvider from './assets/ThemeContext.jsx';
import Products from './assets/product.jsx';
import Pasar from './assets/pasar.jsx';
import AddProduct from './assets/AddProduct.jsx';


// Komponen User
const User = (props) => {
  const { name } = props;
  return (
    <div>
      <h1>My Name is {name}</h1>
    </div>
  );
};

function App() {
  const [name] = useState('Zalfa Destian Ramadhani');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Router>
      <div className="App">
        <nav className="topnav">
          <div>
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/contact">
                <li>Contact</li>
              </Link>
              <Link to="/product">
                <li>Product</li>
              </Link>
              <Link to="/products">
                <li>Tugas 5</li>
              </Link>
              {isLoggedIn && (
                <>
                  <Link to="/dashboard">
                    <li>Dashboard</li>
                  </Link>
                  <Link to="/user">
                    <li>User Profile</li>
                  </Link>
                </>
              )}
            </ul>
            <button onClick={handleAuth}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </nav>
        
        <div className="App">
          <div>
            <h1 className="title">React Component</h1>
            <User name={name} />
            <Counter initialCount={0} />
          </div>
        </div>

        <ThemeProvider>
          <Component />
        </ThemeProvider>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product" element={<Products />} />
          <Route path="/products" element={<Pasar />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute
                element={<Dashboard />}
                isAuthenticated={isLoggedIn}
              />
            }>
            <Route path="overview" element={<Overview />} />
            <Route path="stats" element={<Stats />} />
          </Route>
          <Route
            path="/user/*"
            element={
              <ProtectedRoute
                element={<Users />}
                isAuthenticated={isLoggedIn}
              />
            }>
            <Route path="details/:userId" element={<UserDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
