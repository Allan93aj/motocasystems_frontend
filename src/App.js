import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Atualizado
import Novoregistro from './Components/Novoregistro/Novoregistro'
import Home from './Components/Home/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/novoregistro" element={<Novoregistro/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
