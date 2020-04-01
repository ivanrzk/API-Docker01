# API-Docker01
API RESTFull para el manejo de Docker

## Metodos definidos
# Lista de contenedores
GET /api/docker

# Detalle por contenedor
GET /api/docker/id

# Crear contenedor
POST /api/docker
Body RAW JSON
Ej:
{
  "nombre" : "prueba5",
  "imagen" : "cirros",
  "ip" : "172.18.0.33",
  "port" : "3500",
  "volumen" :  "/root/ansible/nodejs/test:/etc"
}

# Borrar contenedor
DELETE /api/docker/id
