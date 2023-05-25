import axios from "axios"
import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { verifyToken } from "../middleware/auth";


const URI = 'http://127.0.0.1:8000'

const CompUpdateProducto = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(
        () => {
            getProductoById()
        },
        []
    )

    const getProductoById = async () => {
        const res = await axios.get(URI + '/' + sessionStorage.getItem('token') + '/productos/' + id)
        console.log(res.data)
        const nombreInput = document.getElementById("nombreInput")
        const existenciasInput = document.getElementById("existenciasInput")
        const costoInput = document.getElementById("costoInput")
        const pventacnInput = document.getElementById("pventacnInput")
        const pventacfInput = document.getElementById("pventacfInput")
        const urlimgInput = document.getElementById("urlimgInput")


        nombreInput.value = res.data[0].nombre
        existenciasInput.value = res.data[0].existencias
        costoInput.value = res.data[0].costo
        pventacnInput.value = res.data[0].pventacn
        pventacfInput.value = res.data[0].pventacf
        urlimgInput.value = res.data[0].urlimagen
    }

    const update = async (e) => {
        e.preventDefault()
        const nombreInput = document.getElementById("nombreInput")
        const existenciasInput = document.getElementById("existenciasInput")
        const costoInput = document.getElementById("costoInput")
        const pventacnInput = document.getElementById("pventacnInput")
        const pventacfInput = document.getElementById("pventacfInput")
        const urlimgInput = document.getElementById("urlimgInput")

        await axios.put(URI + '/' + sessionStorage.getItem('token') + '/productos/' + id, {
            existencias: existenciasInput.value,
            nombre: nombreInput.value,
            costo: costoInput.value,
            pventacn: pventacnInput.value,
            pventacf: pventacfInput.value,
            idclienteowner: decodeToken(sessionStorage.getItem('token')).id,
            urlimagen: urlimgInput.value
        }).then((response) => {alert("Producto actualizado con éxito!"); navigate("/dashboard/productos");} )
        .catch((error) => alert("Algo ha salido mal D: por favor intente más tarde!"))
    }
    
    if (verifyToken(sessionStorage.getItem('token'))) return (
        <div className="container">
            <div className="card-header text-left">
                <br></br>
                <h5>Actualización de producto</h5>
                <span className="d-block m-t-5">En esta sección puede modificar los datos de un producto que usted venda en nuestra tienda</span>
                <br></br>
                <br></br>
            </div>

            <div class="card-body">
                <h5>Datos del producto</h5>
                <br></br>
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <form onSubmit={update}>
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
                            <button type="submit" class="btn btn-primary">Guardar cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompUpdateProducto