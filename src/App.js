import Home from './Components/Pages/Home/Home'
import store from './redux/store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Novoregistro from './Components/Pages/Registrar/Novoregistro'
import EditarProduto from './Components/Pages/EditarProduto/EditarProduto'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
        <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} ></Route>
                <Route path="/novoregistro" element={<Novoregistro/>} ></Route>
                <Route path="/editar/:id" element={<EditarProduto/>} ></Route>
            </Routes>
            </div>
        </Router>
    </Provider>
  )
}

export default App