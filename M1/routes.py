from flask import Blueprint, jsonify, request
from models import *
import jwt
from datetime import datetime, timedelta
import hashlib
import requests
import json

rutas = Blueprint('example', __name__)
rutaApi2 = 'http://127.0.0.1:6000'


@rutas.route('/cliente', methods=['POST'])
@rutas.route('/cliente/<nit>/<contra>', methods=['GET', 'PUT', 'DELETE'])
def mange_tipotransaccion(nit=None, contra=None):
    try:
        if request.method == 'GET':
            ret=list(datos_cliente.select().where(datos_cliente.nit_cliente == nit).dicts())
            ret = [c for c in ret if c['contra'] == contra][0]
            ret['exp'] = (datetime.now() + timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S")
            ret = {'token': jwt.encode(ret,'mi_clave_secreta', algorithm='HS256')}

            if len(ret) == 0:
                return jsonify({"error": "Credenciales incorrectas, intentelo de nuevo"})

            return jsonify(ret)
        
        elif request.method == 'POST':
            req_data = request.get_json()
            rbusq = list(datos_cliente.select().where(datos_cliente.nit_cliente == req_data['nit_cliente']).dicts())
            if len(rbusq) == 0:
                datos_cliente.create(nombre=req_data['nombre'],nit_cliente=req_data['nit_cliente'],contra=hashlib.sha256(req_data["contra"].encode( 'utf-8')).hexdigest(), ciudad=req_data['ciudad'],direccion=req_data['direccion'],codigoPstal=req_data['codigoPostal'],pedidos=0,clientefrecuente=False)
            else: 
                ctapedidos = int(rbusq[0]['pedidos'])+1
                frecuencia = False
                if ctapedidos % 15 ==0: frecuencia = True
                datos_cliente.update(pedidos = ctapedidos, clientefrecuente = frecuencia).where(datos_cliente.nit_cliente==req_data['nit_cliente']).execute()
            return jsonify({'message': 'Datos agregados con exito'})
        
        elif request.method == 'PUT':
            req_data = request.get_json()
            datos_cliente.update(**req_data).where(datos_cliente.id==id).execute()
            return jsonify({'message': 'Datos Actualizado perfectamente'})
        
        elif request.method == 'DELETE':
            datos_cliente.delete_by_id(id)
            return jsonify({'message': 'Dato eliminado correctamente'})
        
    except Exception as e:
        return jsonify({'message': str(e)})
    
@rutas.route('/<token>/cliente', methods=['GET', 'PUT', 'DELETE'])
def mange_editcliente(token = None):
    try:
        if request.method == 'GET':
            data = jwt.decode(token,'mi_clave_secreta', algorithms=['HS256'])
            fecha_cadena = datetime.strptime(data['exp'], "%Y-%m-%d %H:%M:%S")
            fecha_actual = datetime.now()

            if fecha_cadena < fecha_actual:
                return jsonify(data)
            return jsonify({'message': 'ERROR TOKEN INVALIDO'})
        
        elif request.method == 'POST':
            req_data = request.get_json()
            rbusq = list(datos_cliente.select().where(datos_cliente.nit_cliente == req_data['nit_cliente']).dicts())
            if len(rbusq) == 0:
                datos_cliente.create(nombre=req_data['nombre'],nit_cliente=req_data['nit_cliente'],contra=hashlib.sha256(req_data["contra"].encode( 'utf-8')).hexdigest(), ciudad=req_data['ciudad'],direccion=req_data['direccion'],codigoPstal=req_data['codigoPostal'],pedidos=0,clientefrecuente=False)
            else: 
                ctapedidos = int(rbusq[0]['pedidos'])+1
                frecuencia = False
                if ctapedidos % 15 ==0: frecuencia = True
                datos_cliente.update(pedidos = ctapedidos, clientefrecuente = frecuencia).where(datos_cliente.nit_cliente==req_data['nit_cliente']).execute()
            return jsonify({'message': 'Datos agregados con exito'})
        
        elif request.method == 'PUT':
            req_data = request.get_json()
            datos_cliente.update(**req_data).where(datos_cliente.id==id).execute()
            return jsonify({'message': 'Datos Actualizado perfectamente'})
        
        elif request.method == 'DELETE':
            datos_cliente.delete_by_id(id)
            return jsonify({'message': 'Dato eliminado correctamente'})
        
    except Exception as e:
        return jsonify({'message': str(e)})