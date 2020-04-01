const express = require('express'); 
const docker = require('../modules/docker');
const routes = express();


routes.get('/', (req, res) => {
    docker.comandos('docker container ls --format="{\\"id\\":\\"{{.ID}}\\",\\"name\\":\\"{{.Names}}\\",\\"Imagen\\":\\"{{.Image}}\\",\\"Ports\\":\\"{{.Ports}}\\",\\"Status\\":\\"{{.Status}}\\"}" --all')
    .then(mensaje => res.json(mensaje))
    .catch(mensaje => res.status(400).send(mensaje));
});

routes.get('/:id', (req, res) => {
    let id = req.params.id
    docker.comandos(`docker inspect ${id}`)
    .then(mensaje => res.send(mensaje))
    .catch(mensaje => res.status(400).send(mensaje));
});

routes.post('/', (req, res) => {
    let nom = req.body.nombre
    let img = req.body.imagen
    let vol = req.body.volumen
    let ip = req.body.ip
    let port = req.body.port
    let red = req.body.red
    if(red){
        docker.comandos(`docker run --name ${nom} --net=${red} --ip=${img} -v ${vol} -d ${img}`)
            .then(mensaje => res.send(mensaje))
            .catch(mensaje => res.status(400).send(mensaje));
    } else {
        docker.comandos(`docker run --name ${nom} -p ${ip}:${port}:5432 -v ${vol} -d ${img}`)
            .then(mensaje => res.send(mensaje))
            .catch(mensaje => res.status(400).send(mensaje));
    }
});

routes.delete('/:id', (req, res) => {
    let id = req.params.id
    docker.comandos(`docker rm -f ${id}`)
        .then(mensaje => res.send(mensaje))
        .catch(mensaje => res.status(400).send(mensaje));
});

module.exports = routes