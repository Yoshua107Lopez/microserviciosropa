using ODBC
using DataFrames
using Dates

conn = ODBC.Connection("Driver=ODBC Driver 17 for SQL Server;SERVER=DESKTOP-P0GAB5U;DATABASE=micro2;UID=sa;PWD=7767")

function get_productos(id=-1)
    if id >= 0
        data = DBInterface.execute(conn, "SELECT * FROM productos WHERE idproducto = $id AND estado = 1") |> DataFrame
    else
        data = DBInterface.execute(conn, "SELECT * FROM productos WHERE estado = 1") |> DataFrame
    end

    ret = Vector{Any}()

    for row in eachrow(data)
        push!(ret, Dict(zip(names(row), values(row))))
    end

    return ret
end

function insert_producto(existencias, nombre, costo, pventacn, pventacf, idclienteowner, urlimagen)
    ff = Dates.format(now(), "YYYY-mm-dd HH:MM.sss")
    ff = "convert(datetime, '$ff', 21)"
    DBInterface.execute(conn, "INSERT INTO productos VALUES ($existencias, '$nombre', $costo, $pventacn, $pventacf, $ff, $ff, 1, $idclienteowner, '$urlimagen')")
end

function update_producto(id, existencias, nombre, costo, pventacn, pventacf, urlimagen)
    ff = Dates.format(now(), "YYYY-mm-dd HH:MM.sss")
    ff = "convert(datetime, '$ff', 21)"
    DBInterface.execute(conn, "UPDATE productos SET existencias = $existencias, nombre = '$nombre', costo = $costo, pventacn = $pventacn, pventacf = $pventacf, updatedAt = $ff, urlimagen = '$urlimagen' WHERE idproducto = $id")
end

function update_existencias_producto(idproducto, unidadessalida)
    ff = Dates.format(now(), "YYYY-mm-dd HH:MM.sss")
    ff = "convert(datetime, '$ff', 21)"
    DBInterface.execute(conn, "UPDATE productos SET existencias = existencias - $unidadessalida, updatedAt = $ff WHERE idproducto = $idproducto")    
end

function delete_producto(id)
    DBInterface.execute(conn, "UPDATE productos SET estado = 0 WHERE idproducto = $id")
end

function get_pedidos(id = -1)
    if id >= 0
        data = DBInterface.execute(conn, "SELECT * FROM pedidos WHERE estado = 1 AND idpedido = $id") |> DataFrame
    else
        data = DBInterface.execute(conn, "SELECT * FROM pedidos WHERE estado = 1") |> DataFrame
    end

    ret = Vector{Any}()

    for row in eachrow(data)
        dti = Dict(zip(names(row), values(row)))
        dti["nombreproducto"] = get_productos(dti["idproducto"])[1]["nombre"]
        push!(ret, dti)
    end

    return ret
end

function insert_pedido(idcliente, clientefrecuente, idproducto, cantidad)
    p = Vector{Any}()
    ff = Dates.format(now(), "YYYY-mm-dd HH:MM.sss")
    ff = "convert(datetime, '$ff', 21)"

    if clientefrecuente
        subtotal = cantidad*get_productos(idproducto)[1]["pventacf"]
    else
        subtotal = cantidad*get_productos(idproducto)[1]["pventacn"]
    end

    println("antes de ejecutar la insercion")
    DBInterface.execute(conn, "INSERT INTO pedidos VALUES ($idcliente, $cantidad, $subtotal, $ff, $ff, $idproducto, 1)")
    println("luego de la insercion")
end

function delete_pedido(idcliente, fechahora)
    ff = "convert(datetime, '$fechahora', 21)"
    DBInterface.execute(conn, "UPDATE pedidos SET estado = 0 WHERE idusuario = $idcliente AND createdAt = $ff")
end

function delete_pedido_by_id(id)
    DBInterface.execute(conn, "UPDATE pedidos SET estado = 0 WHERE idpedido = $id") 
end