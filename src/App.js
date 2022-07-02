import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from './components/login';
import Product from './components/product';
import 'antd/dist/antd.css';

function App() {

  useEffect(() => {
    const fetchData = async () => {
    
    };

    fetchData();
  }, []);

  return (
    <Routes>
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <p>EMPTY</p>
          }
        />
    </Routes>
  );
}


export default App;