const express = require('express'); 
const { exec } = require("child_process");
const docker = require('./modules/docker');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escucando en puerto ${port}..`);
});

app.get('/api/docker/', (req, res) => {
    docker.comandos('docker container ls --format="{\\"id\\":\\"{{.ID}}\\",\\"name\\":\\"{{.Names}}\\",\\"Imagen\\":\\"{{.Image}}\\",\\"Ports\\":\\"{{.Ports}}\\",\\"Status\\":\\"{{.Status}}\\"}" --all')
    .then(mensaje => res.json(mensaje))
    .catch(mensaje => res.status(400).send(mensaje));
});

app.get('/api/docker/:id', (req, res) => {
    let id = req.params.id
    docker.comandos(`docker inspect ${id}`)
    .then(mensaje => res.send(mensaje))
    .catch(mensaje => res.status(400).send(mensaje));
});

app.post('/api/docker/', (req, res) => {
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

app.delete('/api/docker/:id', (req, res) => {
    let id = req.params.id
    docker.comandos(`docker rm -f ${id}`)
        .then(mensaje => res.send(mensaje))
        .catch(mensaje => res.status(400).send(mensaje));
});