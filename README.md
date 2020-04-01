# API-Docker01
API RESTFull para el manejo de Docker

# Metodos definidos
## Lista de contenedores
GET /api/docker

## Detalle por contenedor
GET /api/docker/id

## Crear contenedor
POST /api/docker
Body RAW JSON
Ej:
{
  "nombre" : "prueba5",
  "imagen" : "cirros",
  "ip" : "192.168.0.23",
  "port" : "3500",
  "volumen" :  "/root/test/test:/etc"
}

## Borrar contenedor
DELETE /api/docker/id
