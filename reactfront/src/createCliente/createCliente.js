import axios from "axios"
import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { verifyToken } from "../middleware/auth";


const URI = 'http://127.0.0.1:5000/cliente'

const CompCreateCliente = () => {
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        const nombreInput = document.getElementById("nombreInput")
        const nitCliente = document.getElementById("nitCliente")
        const contra = document.getElementById("contra")
        const ciudad = document.getElementById("ciudad")
        const direccion = document.getElementById("direccion")
        const CodigoPostal = document.getElementById("CodigoPostal")

        await axios.post(URI , {
            nombre: nombreInput.value,
            nit_cliente: nitCliente.value,
            contra: contra.value,
            ciudad: ciudad.value,
            direccion: direccion.value,
            codigoPostal: CodigoPostal.value
        }).then((response) => {alert("Nuevo Cliente Agregado con exito"); navigate("/");} )
        .catch((error) => alert("Algo ha salido mal D: por favor intente más tarde!"))
    }
    
    if (true) return (
        <div className="container">
            <div className="card-header text-left">
                <br></br>
                <h5>Nuevo Cliente</h5>
                <span className="d-block m-t-5">En esta sección podra crear su nuevo usuario</span>
                <br></br>
                <br></br>
            </div>

            <div class="card-body">
                <h5>Datos para crear un nuevo cliente</h5>
                <br></br>
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <form onSubmit={store}>
                            <div class="form-group">
                                <label>Nombre</label>
                                <input id="nombreInput" required type="text" class="form-control" placeholder="Ingrese Nombre"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>Nit Cliente</label>
                                <input id="nitCliente" required type="text" class="form-control" placeholder="Ingrese Nit"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>Contraseña</label>
                                <input id="contra" required type="password" class="form-control" placeholder="Ingrese Contraseña"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>Ciudad</label>
                                <input id="ciudad" required type="text" class="form-control" placeholder="Ingrese Ciudad"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>Direccion</label>
                                <input id="direccion" required type="text" class="form-control" placeholder="Ingrese Direccion"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>CodigoPostal</label>
                                <input id="CodigoPostal" required type="text" class="form-control" placeholder="Ingrese Codigo Postal"></input>
                            </div>
                            <br></br>
                            <Link to={"/"} style={{marginRight: 10 + "px"}} type="button" className="btn btn-danger" data-toggle="tooltip">Cancelar</Link>
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompCreateCliente