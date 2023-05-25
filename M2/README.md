# ejemplos de Requests a M2

PRODUCTOS request body
{
  "existencias": 1,
  "nombre": "iphone 11",
  "costo": 1,
  "pventacn": 1,
  "pventacf": 1
}
"""

"""
PEDIDOS request body
{
    "cliente": "286r87a46876b87qf6b7834",
    "pedido": [
        {
            "producto": 1,
            "cantidad": 3
        },
        {
            "producto": 2,
            "cantidad": 6
        }
    ]
}

delete pedido
{
    "cliente": "286r87a46876b87qf6b7834",
    "createdAt": "2023-05-07 18:13:00.060"
}
