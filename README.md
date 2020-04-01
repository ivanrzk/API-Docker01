# API-Docker01
API RESTFull para el manejo de Docker

## Instalacion
Instalar nodejs LTS:
<<<<<<< HEAD

  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

  sudo apt-get install -y nodejs

Clonar repo:
  
  git clone https://github.com/ivanrzk/API-Docker01.git
  
  cd API-Docker01/
  
Instalar dependencias:
  
  npm install

Ejecutar APP:

  Usar variable de entorno PORT para elegir el puerto, sino por default escucha en 3000.

  (export PORT="puerto")

  node app.js

Nota:

  Instalar nodemon, para debug y no tener que parar y volver a iniciar la app para que tome los cambies, se actualiza en caliente.
  
  npm install -g nodemon
  
  Lanzar app:
  
=======
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt-get install -y nodejs

Clonar repo:
  git clone https://github.com/ivanrzk/API-Docker01.git
  cd API-Docker01/
  Instalar dependencias:
  npm install

Ejecutar APP:
  Usar variable de entorno PORT para elegir el puerto, sino por default escucha en 3000.
  (export PORT="puerto")
  node app.js

Nota:
  Instalar nodemon, para debug y no tener que parar y volver a iniciar la app para que tome los cambies, se actualiza en caliente.
  npm install -g nodemon
  Lanzar app:
>>>>>>> 3a356834f3d16daef494f3ab1c1b39c85ffb078b
  nodemon app.js

# Metodos definidos
## Lista de contenedores
GET /api/docker

## Detalle por contenedor
GET /api/docker/id

## Crear contenedor
POST /api/docker

Body RAW JSON

Ej:

```html
{
  "nombre" : "prueba5",
  "imagen" : "cirros",
  "ip" : "192.168.0.23",
  "port" : "3500",
  "volumen" :  "/root/test/test:/etc"
}
```
## Borrar contenedor
DELETE /api/docker/id
