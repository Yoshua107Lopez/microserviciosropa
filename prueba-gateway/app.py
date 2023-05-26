from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

URIcliente = 'http://127.0.0.1:5000/cliente'
URIvendedores = 'http://127.0.0.1:8000/vendedores'
URIproductos = 'http://127.0.0.1:7000/productos'
URIfactura = 'http://127.0.0.1:5050/facturas'

def send_request(method, uri, data=None):
    try:
        if method == 'GET':
            res = requests.get(uri)
        elif method == 'POST':
            res = requests.post(uri, json=data)
        elif method == 'PUT':
            res = requests.put(uri, json=data)
        elif method == 'DELETE':
            res = requests.delete(uri)
        else:
            return jsonify({'message': f'ERROR: Metodo {method} no implementado'})
        
        return jsonify(res.json())
    except Exception as e:
        return jsonify({'message': f'ERROR: {str(e)}'})

@app.route('/cliente', methods=['GET', 'POST'])
@app.route('/cliente/<nit>/<contra>', methods=['GET'])
def manage_facturas(nit = None, contra = None):
    try:
        if request.method == 'GET':
            print('hola')
            res = requests.get(URIcliente + '/' + str(nit) + '/' + str(contra))
            # res = requests.get(URIcliente)
            return jsonify(res.json())
        elif request.method == 'POST':
            res = requests.post(URIcliente, json=request.get_json())
            return jsonify(res.json())
        else:
            return jsonify({'message': f'ERROR: Metodo {request.method} no implementado'})
    except Exception as e:
        return jsonify({'message': f'ERROR: {str(e)}'})
    
@app.route('/vendedores', methods=['GET', 'POST'])
def manage_vendedores():
    if request.method == 'GET':
        return send_request('GET', URIvendedores)
    elif request.method == 'POST':
        data = request.get_json()
        return send_request('POST', URIvendedores, data=data)
    else:
        return send_request(request.method, URIvendedores)

@app.route('/vendedores/<id>', methods=['GET', 'PUT', 'DELETE'])
def vendedor_actions(id):
    if request.method == 'GET':
        return send_request('GET', f'{URIvendedores}/{id}')
    elif request.method == 'PUT':
        data = request.get_json()
        return send_request('PUT', f'{URIvendedores}/{id}', data=data)
    elif request.method == 'DELETE':
        return send_request('DELETE', f'{URIvendedores}/{id}')
    else:
        return send_request(request.method, f'{URIvendedores}/{id}')

@app.route('/productos', methods=['GET', 'POST'])
def manage_productos():
    if request.method == 'GET':
        return send_request('GET', URIproductos)
    elif request.method == 'POST':
        data = request.get_json()
        return send_request('POST', URIproductos, data=data)
    else:
        return send_request(request.method, URIproductos)

@app.route('/productos/<id>', methods=['GET', 'PUT', 'DELETE'])
def producto_actions(id):
    if request.method == 'GET':
        return send_request('GET', f'{URIproductos}/{id}')
    elif request.method == 'PUT':
        data = request.get_json()
        return send_request('PUT', f'{URIproductos}/{id}', data=data)
    elif request.method == 'DELETE':
        return send_request('DELETE', f'{URIproductos}/{id}')
    else:
        return send_request(request.method, f'{URIproductos}/{id}')

@app.route('/facturas', methods=['GET', 'POST'])
def manage_productos():
    if request.method == 'GET':
        return send_request('GET', URIproductos)
    elif request.method == 'POST':
        data = request.get_json()
        return send_request('POST', URIproductos, data=data)
    else:
        return send_request(request.method, URIproductos)

@app.route('/facturas/<id>', methods=['GET', 'PUT', 'DELETE'])
def producto_actions(id):
    if request.method == 'GET':
        return send_request('GET', f'{URIproductos}/{id}')
    elif request.method == 'PUT':
        data = request.get_json()
        return send_request('PUT', f'{URIproductos}/{id}', data=data)
    elif request.method == 'DELETE':
        return send_request('DELETE', f'{URIproductos}/{id}')
    else:
        return send_request(request.method, f'{URIproductos}/{id}')

if __name__ == '__main__':
    app.run(port=9000, debug=True)

