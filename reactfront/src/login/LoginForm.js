import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Alert } from "bootstrap";
import { sha256, sha224 } from 'js-sha256';


const URI = 'http://127.0.0.1:5000/cliente'

const CompLogin = () => {
    const navigate = useNavigate()

    const authenticate = async(event) => {
        event.preventDefault();  
        const nit = document.getElementById('inputnit')
        const contra = document.getElementById('inputcontra')

        await axios.get(URI + '/' + nit.value + '/' + sha256(contra.value))
            .then(response => {
                if (response.data.token == undefined) {
                    alert("ERROR: Credenciales incorrectas, intentelo de nuevo")  
                }
                else {
                    navigate('/dashboard')
                    sessionStorage.setItem('token', response.data.token)
                }
            })
            .catch(error => {
                alert("ERROR: Credenciales incorrectas, intentelo de nuevo")
            });
    }
 
    return (
        <div className='container text-left'>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="card-header">
                <h5>LOG-IN</h5>
            </div>

            <div className="card-body">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <form>
                            <div class="form-group">
                                <label>NIT</label>
                                <input id="inputnit" className="form-control" placeholder="Ingrese su NIT"></input>
                            </div>
                            <br></br>
                            <div class="form-group">
                                <label>Contraseña</label>
                                <input id="inputcontra" type="password" className="form-control" placeholder="Ingrese su contraseña"></input>
                            </div>
                            <br></br> 
                            <button onClick={authenticate} className="btn btn-primary">Autenticarse</button> 
                            <Link to={"/crearcliente"} className="btn btn-success" >Crear Cuenta</Link> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompLogin
