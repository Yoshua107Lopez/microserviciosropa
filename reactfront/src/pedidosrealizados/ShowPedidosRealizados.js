import axios from "axios"
import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { verifyToken } from "../middleware/auth";


const URI = 'http://127.0.0.1:8000'

const CompMisPedidos = () => {
    const navigate = useNavigate()
    const [nombrefiltro, setNombrefiltro] = useState("")
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
            getPedidos()
        },[]
    )
    
    const getPedidos = async () => {
        const res = await axios.get(URI + '/' + sessionStorage.getItem('token') + '/pedidos')
        setPedidos(res.data)
    }

    const deletePedido = async (id) => {
        await axios.delete(URI + '/' + sessionStorage.getItem('token') + '/pedidos/' + id)
        getPedidos()
    }
    
    if (verifyToken(sessionStorage.getItem('token'))) return (
        <div className="container">
            <div className="card-header text-left">
                <br></br>
                <h5>Mis pedidos</h5>
                <br></br>
                <Link to={"/dashboard"} type="button" className="btn btn-warning" data-toggle="tooltip">Dashboard</Link>
                <br></br>
                <br></br>
                <input id="busqprod" value={nombrefiltro} onChange={ (e) => setNombrefiltro(e.target.value) } className="form-control" placeholder="Ingrese un nombre de producto a buscar"></input>
                <br></br>
            </div>

            <div className="card-block table-border-style">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id pedido</th>
                                <th>Producto</th>
                                <th>Unidades</th>
                                <th>Subtotal</th>
                                <th>Fecha Creación</th>
                                <th>Fecha última modificación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody style={{verticalAlign: "middle"}}>
                            {
                                pedidos.filter(dtyo => dtyo.idusuario == decodeToken(sessionStorage.getItem('token')).id && dtyo.nombreproducto.includes(nombrefiltro)).map(
                                    (dtyo) => (
                                        <tr key={dtyo.idpedido}>
                                            <th scope="row">{dtyo.idpedido}</th>
                                            <td>{dtyo.nombreproducto}</td>
                                            <td>{dtyo.cantidad}</td>
                                            <td>{dtyo.subtotal}</td>
                                            <td>{dtyo.createdAt}</td>
                                            <td>{dtyo.updatedAt}</td>
                                            <td>
                                                <button onClick={ () => deletePedido(dtyo.idpedido) } type="button" class="btn btn-danger" data-toggle="tooltip">
                                                    Cancelar pedido
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompMisPedidos