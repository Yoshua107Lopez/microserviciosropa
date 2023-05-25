from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)

URIfacturas = 'http://127.0.0.1:6000/facturas'


@app.route('/gateway/facturas', methods=['GET', 'POST'])
@app.route('/gateway/facturas/<int:id>', methods=['GET'])
def manage_facturas(id = None):
    try:
        if request.method == 'GET':
            if id: res = requests.get(URIfacturas + '/' + str(id))
            res = requests.get(URIfacturas)
            return jsonify(res.json())
        elif request.method == 'POST':
            res = requests.post(URIfacturas, json=request.get_json())
            return jsonify(res.json())
        else:
            return jsonify({'message': f'ERROR: Metodo {request.method} no implementado'})
    except Exception as e:
        return jsonify({'message': f'ERROR: {str(e)}'})
    

if __name__ == '__main__':
    app.run(port=9000, debug=True)
