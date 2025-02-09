import './bootstrap';
import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Components/Home/Home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ListFragrances from './Components/Fragrance/ListFragrances';
import AddFragrance from './Components/Fragrance/AddFragrance';

ReactDOM.createRoot(document.getElementById('app')).render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/fragrances" element={<ListFragrances/>} />
            {/* <Route path="/favoritess" element={<ListFavorites/>} /> */}
            {/* <Route path="/cart" element={<ListCart/>} /> */}
            <Route path="/addFragrance" element={<AddFragrance/>} />
        </Routes>
    </HashRouter>
);