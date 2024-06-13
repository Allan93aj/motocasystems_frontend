import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Crud/Home/Home";
import Novoregistro from './Crud/Novoregistro/Novoregistro';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/novoregistro" element={<Novoregistro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
