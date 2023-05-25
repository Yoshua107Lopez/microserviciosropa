import axios from "axios"
import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { verifyToken, logout } from "../middleware/auth";

const URI = 'http://127.0.0.1:8000'

const CompDashboardCliente = () => {
    const [productos, setProductos] = useState([])
    const [nombrefiltro, setNombrefiltro] = useState("")
    const [cantidadagregar, setCantidadagregar] = useState("")
    const [idprodpedido, setIdprodpedido] = useState(0)
    const [cantidadMax, setCantidadMax] = useState(0)

    useEffect(() => {
            getProductos()
        },
        []
    )

    const getProductos = async () => {
        const res = await axios.get(URI + '/' + sessionStorage.getItem('token') + '/productos')
        console.log(res.data)
        setProductos(res.data)
    }

    const agregarPedido = async () => {
        const selectorUnidades = document.getElementById("selectorUnidades")

        if (selectorUnidades.value > 0) {
            await axios.post(URI + '/' + sessionStorage.getItem('token') + '/pedidos', {
                producto: idprodpedido,
                cantidad: selectorUnidades.value    
            }).then((response) => {alert("Pedido realizado con éxito, por favor realice el pago al vendedor!"); getProductos();})
            .catch((error) => alert("Algo ha salido mal D: por favor intente más tarde!"))
        }
        else {
            alert("Recuerde que el pedido debe ser con unidades mayores que cero!")
        }

        selectorUnidades.value = 0
    }
    
    if (verifyToken(sessionStorage.getItem('token'))) return (
        <div className="container">
            <div className="card-header text-left">
                <br></br>
                <h5>Productos</h5>
                <br></br>
                <Link to={"/dashboard/mispedidos"} style={{marginRight: 10 + "px"}} type="button" className="btn btn-primary" data-toggle="tooltip">Mis pedidos</Link>
                <Link to={"/dashboard/productos"} style={{marginRight: 10 + "px"}} type="button" className="btn btn-warning" data-toggle="tooltip">Mis productos en venta</Link>
                <Link to={"/dashboard/cliente/editar/:id"} style={{marginRight: 10 + "px"}} type="button" className="btn btn-success" data-toggle="tooltip">EditarPerfil</Link>

                <Link onClick={logout} to="/" type="button" className="btn btn-danger" data-toggle="tooltip">Log-out</Link>
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
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Existencias</th>
                                <th>Precio venta</th>
                                <th>Precio cliente frec.</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody style={{verticalAlign: "middle"}}>
                            {
                                productos.filter(dtyo => dtyo.nombre.includes(nombrefiltro)).map(
                                    (dtyo) => (
                                        <tr key={dtyo.idproducto}>
                                            <th scope="row">{dtyo.idproducto}</th>
                                            <td>{dtyo.nombre}</td>
                                            <td>{dtyo.existencias}</td>
                                            <td>{dtyo.pventacn}</td>
                                            <td>{dtyo.pventacf}</td>
                                            <td><img style={{filter: "brightess(1.1)", mixBlendMode: "multiply"}} src={dtyo.urlimagen} height="100px"></img></td>
                                            <td>
                                                <button onClick={ () => {setCantidadMax(dtyo.existencias); setIdprodpedido(dtyo.idproducto);} } type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropCompra">
                                                    Realizar Pedido
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

            <div class="modal fade" id="staticBackdropCompra" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalles de pedido</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label style={{marginRight: 20 + 'px'}} >Unidades:</label>
                            {/* <input value={cantidadagregar} onChange={(e) => setCantidadagregar(e.target.value)} type="number" min={0} placeholder="Cantidad"></input> */}

                            <select id="selectorUnidades">
                                {
                                    Array.from({length: cantidadMax+1}, (_, index) => index).map(
                                        (num) => (
                                            <option value={num}>
                                                {num}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Volver</button>
                            <button onClick={agregarPedido} type="button" class="btn btn-primary" data-bs-dismiss="modal">Realizar pedido</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompDashboardCliente