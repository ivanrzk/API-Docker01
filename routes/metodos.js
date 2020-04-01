const express = require('express'); 
const docker = require('../services/docker'); //Midleware que ejecuta los comandos
const Joi = require('@hapi/joi'); //Validaro de valores
const routes = express();

// traigo todos los contenedores ( Interno: Ver bien en podes devolver un json mejor usando jq)
routes.get('/', (req, res) => {
    docker.comandos('docker container ls --format="{\\"id\\":\\"{{.ID}}\\",\\"name\\":\\"{{.Names}}\\",\\"Imagen\\":\\"{{.Image}}\\",\\"Ports\\":\\"{{.Ports}}\\",\\"Status\\":\\"{{.Status}}\\"}" --all')
    .then(mensaje => res.json(mensaje))
    .catch(mensaje => res.status(400).send(mensaje));
});
//Detalles de un contenedor en particular
routes.get('/:id', (req, res) => {
    let id = req.params.id
    docker.comandos(`docker inspect ${id}`)
    .then(mensaje => res.send(mensaje))
    .catch(mensaje => res.status(400).send(mensaje));
});
//Creo un contenedor nuevo
routes.post('/', (req, res) => {
    let nom = req.body.nombre
    let img = req.body.imagen
    let vol = req.body.volumen
    let ip = req.body.ip
    let port = req.body.port
    let red = req.body.red
    //Si paso el parametro red, quiere decir que estoy usando Kuryr, y valido los valores requeridos
    if(red){
        const {error, value} = validarRed1(nom, ip, port, vol, img);
        if(error){
            const mensaje = error.details[0].message;
            res.status(400).send(mensaje);
            return;
        }
        docker.comandos(`docker run --name ${value.nom} --net=${value.red} --ip=${value.img} -v ${value.vol} -d ${value.img}`)
            .then(mensaje => res.send(mensaje))
            .catch(mensaje => res.status(400).send(mensaje));
    } else {
        const {error, value} = validarRed1(nom, ip, port, vol, img);
        if(error){
            const mensaje = error.details[0].message;
            res.status(400).send(mensaje);
            return;
        }    
        docker.comandos(`docker run --name ${value.nom} -p ${value.ip}:${value.port}:5432 -v ${value.vol} -d ${value.img}`)
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

//Valido requerimiento de docker
function validarRed1(nom, ip, port, vol, img){
    const schema = Joi.object({
        nom: Joi.required(),
        ip: Joi.required(),
        port: Joi.required(),
        vol: Joi.required(),
        img: Joi.required()
    });
    return (schema.validate({ nom: nom, ip: ip, port: port, vol: vol, img: img }));
}
//Valido requerimiento de docker con kuryr
function validarRed2(nom, ip, red, vol, img){
    const schema = Joi.object({
        nom: Joi.required(),
        ip: Joi.required(),
        port: Joi.required(),
        vol: Joi.required(),
        img: Joi.required()
    });
    return (schema.validate({ nom: nom, ip: ip, red: red, vol: vol, img: img }));
}
module.exports = routes