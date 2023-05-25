import axios from "axios"
import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { verifyToken } from "../middleware/auth";


const URI = 'http://127.0.0.1:8000'

const CompCreateProducto = () => {
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        const nombreInput = document.getElementById("nombreInput")
        const existenciasInput = document.getElementById("existenciasInput")
        const costoInput = document.getElementById("costoInput")
        const pventacnInput = document.getElementById("pventacnInput")
        const pventacfInput = document.getElementById("pventacfInput")
        const urlimgInput = document.getElementById("urlimgInput")

        await axios.post(URI + '/' + sessionStorage.getItem('token') + '/productos', {
            existencias: existenciasInput.value,
            nombre: nombreInput.value,
            costo: costoInput.value,
            pventacn: pventacnInput.value,
            pventacf: pventacfInput.value,
            idclienteowner: decodeToken(sessionStorage.getItem('token')).id,
            urlimagen: urlimgInput.value
        }).then((response) => {alert("Producto agregado con éxito!"); navigate("/dashboard/productos");} )
        .catch((error) => alert("Algo ha salido mal D: por favor intente más tarde!"))
    }
    
    if (verifyToken(sessionStorage.getItem('token'))) return (
        <div className="container">
            <div className="card-header text-left">
                <br></br>
                <h5>Nuevo producto</h5>
                <span className="d-block m-t-5">En esta sección puede agregar un producto que usted desee vender en la tienda</span>
                <br></br>
                <br></br>
            </div>

            <div class="card-body">
                <h5>Datos del producto</h5>
                <br></br>
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <form onSubmit={store}>
                            <div class="form-group">
                                <label>Nombre</label>
                                <input id="nombreInput" required type="text" class="form-control" placeholder="Enter Name"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>Existencias en stock</label>
                                <input id="existenciasInput" required type="number" class="form-control" placeholder="Enter Existence"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>Costo de compra (costo de adquisicion)</label>
                                <input id="costoInput" required type="number" class="form-control" placeholder="Enter Unitprice"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>Costo de venta (cliente normal)</label>
                                <input id="pventacnInput" required type="number" class="form-control" placeholder="Enter Unitprice"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>Costo de venta (cliente frecuente)</label>
                                <input id="pventacfInput" required type="number" class="form-control" placeholder="Enter Unitprice"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>URL de la imagen del producto</label>
                                <input id="urlimgInput" required type="url" class="form-control" placeholder="Enter Image"></input>
                            </div>
                            <br></br>
                            <Link to={"/dashboard/productos"} style={{marginRight: 10 + "px"}} type="button" className="btn btn-danger" data-toggle="tooltip">Cancelar</Link>
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompCreateProducto