import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CompLogin from './login/LoginForm';
import CompDashboardCliente from './Dashboards/ClienteDashboard';
import CompMisProductos from './misproductos/ShowMisProductos';
import CompMisPedidos from './pedidosrealizados/ShowPedidosRealizados';
import CompCreateProducto from './misproductos/CreateProducto';
import CompUpdateProducto from './misproductos/UpdateProducto';
import CompCreateCliente from './createCliente/createCliente';
import CompUpdateCliente from './editCliente/editCliente';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard/cliente/editar/:id" element={<CompUpdateCliente/>} />
                    <Route path="/crearcliente" element={<CompCreateCliente/>} />
                    <Route path="/dashboard/productos" element={<CompMisProductos/>} />
                    <Route path="/dashboard/productos/crear" element={<CompCreateProducto/>} />
                    <Route path="/dashboard/productos/editar/:id" element={<CompUpdateProducto/>} />
                    <Route path="/dashboard/mispedidos" element={<CompMisPedidos/>} />
                    <Route path="/dashboard" element={<CompDashboardCliente/>}/>
                    <Route path="/" element={<CompLogin/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;

