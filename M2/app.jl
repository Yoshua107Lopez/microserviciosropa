using Genie
using Genie.Requests
using JSON3
using JSONWebTokens
using Dates
include("models.jl")


secretkey = "mi_clave_secreta"
Genie.config.run_as_server = true
Genie.config.cors_headers["Access-Control-Allow-Origin"] = "*"
Genie.config.cors_headers["Access-Control-Allow-Headers"] = "Content-Type"
Genie.config.cors_headers["Access-Control-Allow-Methods"] ="GET,POST,PUT,DELETE,OPTIONS" 
Genie.config.cors_allowed_origins = ["*"]

function verifyToken(token)
    try 
        cliente = JSONWebTokens.decode(JSONWebTokens.HS256(secretkey), token)
        if now() > DateTime(cliente["exp"], "yyyy-mm-dd HH:MM:SS")
            throw(error())
        end

        return true
    catch
        return false
    end
end

route("/:token/productos", method = GET) do
    if verifyToken(payload(:token))
        return JSON3.write(get_productos())    
    end
    return JSON3.write(Dict("message" => "Token invalido!"))
end

route("/:token/productos/:id", method = GET) do
    if verifyToken(payload(:token))
        return JSON3.write(get_productos(parse(Int, payload(:id))))
    end
    return JSON3.write(Dict("message" => "Token invalido!"))
end

route("/:token/productos", method = POST) do 
    req = jsonpayload()

    if verifyToken(payload(:token))
        insert_producto(req["existencias"], req["nombre"], req["costo"], req["pventacn"], req["pventacf"], req["idclienteowner"], req["urlimagen"])
        return JSON3.write(Dict("message" => "Producto agregado con exito!"))
    end
    return JSON3.write(Dict("message" => "Token invalido!"))
end

route("/:token/productos/:id", method = PUT) do 
    req = jsonpayload()
    id = parse(Int, payload(:id))

    if verifyToken(payload(:token))
        update_producto(id, req["existencias"], req["nombre"], req["costo"], req["pventacn"], req["pventacf"], req["urlimagen"])
        return JSON3.write(Dict("message" => "Producto modificado con exito!"))
    end
    return JSON3.write(Dict("message" => "Token invalido!"))
end

route("/:token/productos/:id", method = DELETE) do 
    req = jsonpayload()

    if verifyToken(payload(:token))
        delete_producto(parse(Int, payload(:id)))
        return JSON3.write(Dict("message" => "Producto Eliminado con exito!"))
    end
    return JSON3.write(Dict("message" => "Token invalido!"))
end

route("/:token/pedidos", method = GET) do
    if verifyToken(payload(:token))
        return JSON3.write(get_pedidos())
    end
    return JSON3.write(Dict("message" => "Token invalido!"))
end

route("/:token/pedidos/:id", method = GET) do 
    id = parse(Int, payload(:id))

    if verifyToken(payload(:token))
        return JSON3.write(get_pedidos(id))
    end
    return JSON3.write(Dict("message" => "Token invalido!"))
end

route("/:token/pedidos", method = POST) do 
    req = jsonpayload()
    cliente = JSONWebTokens.decode(JSONWebTokens.HS256(secretkey), payload(:token))

    if verifyToken(payload(:token))
        insert_pedido(cliente["id"], cliente["clientefrecuente"], req["producto"], parse(Int, req["cantidad"]))
        update_existencias_producto(req["producto"], parse(Int, req["cantidad"]))
        return JSON3.write(Dict("message" => "Pedido registrado con exito!"))
    end
    return JSON3.write(Dict("message" => "Token invalido!"))
end

route("/:token/pedidos/:id", method = DELETE) do 
    id = parse(Int, payload(:id))

    if verifyToken(payload(:token))
        delete_pedido_by_id(id)
        return JSON3.write(Dict("message" => "Pedido cancelado con exito!"))
    end
    return JSON3.write(Dict("message" => "Token invalido!"))
end

up(port=8000, async=false)