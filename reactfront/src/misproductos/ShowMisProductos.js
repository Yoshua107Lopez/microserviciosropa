import axios from "axios"
import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { verifyToken } from "../middleware/auth";


const URI = 'http://127.0.0.1:8000'

const CompMisProductos = () => {
    const navigate = useNavigate()
    const [productos, setProductos] = useState([])
    const [nombrefiltro, setNombrefiltro] = useState("")
    const [cantidadagregar, setCantidadagregar] = useState("")
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

    const deleteProductos = async (id) => {
        await axios.delete(URI + '/' + sessionStorage.getItem('token') + '/productos/' + id)
        getProductos()
    }
    
    if (verifyToken(sessionStorage.getItem('token'))) return (
        <div className="container">
            <div className="card-header text-left">
                <br></br>
                <h5>Mis productos en venta</h5>
                <span className="d-block m-t-5">En esta sección puede administrar los productos que usted vende en la tienda</span>
                <br></br>
                <Link to={"/dashboard/productos/crear"} style={{marginRight: 10 + "px"}} type="button" className="btn btn-info" data-toggle="tooltip">Crear nuevo producto</Link>
                <Link to={"/dashboard"} type="button" className="btn btn-warning" data-toggle="tooltip">Dashboard</Link>

                <br></br>
                <br></br>
                <input id="busqprod" value={nombrefiltro} onChange={ (e) => setNombrefiltro(e.target.value) } className="form-control" placeholder="Ingrese un nombre de producto a buscar"></input>
                <br></br>
            </div>

            <div className="card-block table-border-style">
                <div className="">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Existencias</th>
                                <th>Costo compra</th>
                                <th>Precio venta</th>
                                <th>Precio cliente frec.</th>
                                <th>Imagen</th>
                                <th>Fecha creación</th>
                                <th>Último cambio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody style={{verticalAlign: "middle"}}>
                            {
                                productos.filter(dtyo => (dtyo.nombre.includes(nombrefiltro) && dtyo.idclienteowner == decodeToken(sessionStorage.getItem('token')).id)).map(
                                    (dtyo) => (
                                        <tr key={dtyo.idproducto}>
                                            <th scope="row">{dtyo.idproducto}</th>
                                            <td>{dtyo.nombre}</td>
                                            <td>{dtyo.existencias}</td>
                                            <td>{dtyo.costo}</td>
                                            <td>{dtyo.pventacn}</td>
                                            <td>{dtyo.pventacf}</td>
                                            <td><img style={{filter: "brightess(1.1)", mixBlendMode: "multiply"}} src={dtyo.urlimagen} height="100px"></img></td>
                                            <td>{dtyo.createdAt}</td>
                                            <td>{dtyo.updatedAt}</td>
                                            <td>
                                                <Link to={'/dashboard/productos/editar/' + dtyo.idproducto} style={{marginBottom: 5 + "px"}} className="btn btn-primary">Editar</Link>
                                                <button onClick={()=>deleteProductos(dtyo.idproducto)} type="button" className="btn btn-danger" data-toggle="tooltip">Eliminar</button>
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

export default CompMisProductos