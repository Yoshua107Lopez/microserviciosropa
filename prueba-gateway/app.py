from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)

URIcliente = 'http://127.0.0.1:5000/cliente'


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
    

if __name__ == '__main__':
    app.run(port=9000, debug=True)
