from peewee import *

db = MySQLDatabase('facturaciondb', user='root', password='', host='localhost', port=3306)

class Facturas(Model):
    idcliente = IntegerField()
    idvendedor = IntegerField()
    idproducto = IntegerField()
    cantidad = IntegerField()
    
    class Meta:
        database = db