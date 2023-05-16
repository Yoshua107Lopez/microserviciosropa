from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
from models import *


db.connect()
app = Flask(__name__)
CORS(app)

@app.route('/facturas', methods=['GET', 'POST'])
@app.route('/facturas/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def manage_facturas(id = None):
    try:
        if request.method == 'GET':
            if id: return jsonify(list(Facturas.select().where(Facturas.id == id).dicts()))
            return jsonify(list(Facturas.select().dicts()))
        elif request.method == 'POST':
            req_data = request.get_json()
            Facturas.create(**req_data)
            return jsonify({'message': 'Factura registrada con exito!'})
        elif request.method == 'DELETE':
            Facturas.delete_by_id(id)
            return jsonify({'message': 'Factura eliminada con exito!'})
        else:
            return jsonify({'message': f'ERROR: Metodo {request.method} no implementado'})
    except Exception as e:
        return jsonify({'message': f'ERROR: {str(e)}'})
    

if __name__ == '__main__':
    app.run(port=6000, debug=True)
