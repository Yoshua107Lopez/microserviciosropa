from peewee import *

db = MySQLDatabase('miniusers', user='root', password='', host='localhost', port=3306)

class datos_cliente(Model):
    nombre =CharField()
    nit_cliente=CharField()
    contra = CharField()
    ciudad =CharField()
    direccion =CharField()
    codigoPostal =CharField()
    pedidos = IntegerField()
    clientefrecuente = BooleanField()
    
    class Meta: 
        database = db
