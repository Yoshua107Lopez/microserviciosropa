import axios from "axios"
import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { verifyToken } from "../middleware/auth";


const URI = 'http://127.0.0.1:5000'

const CompUpdateCliente = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(
        () => {
            getProductoById()
        },
        []
    )

    const getProductoById = async () => {
        const res = await axios.get(URI + '/' + sessionStorage.getItem('token') + '/cliente')
        console.log(res.data)
        const nombreInput = document.getElementById("nombreInput")
        const nitCliente = document.getElementById("nitCliente")
        const contra = document.getElementById("contra")
        const ciudad = document.getElementById("ciudad")
        const direccion = document.getElementById("direccion")
        const CodigoPostal = document.getElementById("CodigoPostal")

        nombreInput.value = res.data[0].nombre
        nitCliente.value = res.data[0].nitCliente
        contra.value = res.data[0].contra
        ciudad.value = res.data[0].ciudad
        direccion.value = res.data[0].direccion
        CodigoPostal.value = res.data[0].CodigoPostal
    }

    const update = async (e) => {
        e.preventDefault()
        const nombreInput = document.getElementById("nombreInput")
        const nitCliente = document.getElementById("nitCliente")
        const contra = document.getElementById("contra")
        const ciudad = document.getElementById("ciudad")
        const direccion = document.getElementById("direccion")
        const CodigoPostal = document.getElementById("codigoPostal")

        await axios.put(URI + '/' + sessionStorage.getItem('token') + '/cliente/' + id, {
            nitCliente: nitCliente.value,
            nombre: nombreInput.value,
            contra: contra.value,
            ciudad: ciudad.value,
            direccion: direccion.value,
            idclienteowner: decodeToken(sessionStorage.getItem('token')).id,
            CodigoPostal: CodigoPostal.value
        }).then((response) => {alert("Datos cliente actualizado con éxito!"); navigate("/dashboard");} )
        .catch((error) => alert("Algo ha salido mal D: por favor intente más tarde!"))
    }
    
    if (verifyToken(sessionStorage.getItem('token'))) return (
        <div className="container">
            <div className="card-header text-left">
                <br></br>
                <h5>Actualización de datos de Cliente</h5>
                <span className="d-block m-t-5">En esta sección puede modificar los datos de su cuenta de cliente.</span>
                <br></br>
                <br></br>
            </div>

            <div class="card-body">
                <h5>Datos del Cliente</h5>
                <br></br>
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <form onSubmit={update}>
                            <div class="form-group">
                                <label>Nombre</label>
                                <input id="nombreInput" required type="text" class="form-control" placeholder="Nombre"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>nitCliente en stock</label>
                                <input id="nitCliente" required type="text" class="form-control" placeholder="Nit"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>nueva contraseña</label>
                                <input id="contra" required type="password" class="form-control" placeholder="contraseña"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>ciudad</label>
                                <input id="ciudad" required type="text" class="form-control" placeholder="ciudad"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>direccion</label>
                                <input id="direccion" required type="text" class="form-control" placeholder="direccion"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>codigoPostal</label>
                                <input id="codigoPostal" required type="text" class="form-control" placeholder="Codigo Postas"></input>
                            </div>
                            <br></br>
                            <Link to={"/dashboard"} style={{marginRight: 10 + "px"}} type="button" className="btn btn-danger" data-toggle="tooltip">Cancelar</Link>
                            <button type="submit" class="btn btn-primary">Guardar cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompUpdateCliente