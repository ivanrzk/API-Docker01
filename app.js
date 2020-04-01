const express = require('express'); 
const { exec } = require("child_process");
const ls = require('./docker');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escucando en puerto ${port}..`);
});
app.get('/api/docker/', (req, res) => {
    ls.listarDocker('docker ps')
    .then(mensaje => res.send(mensaje))
    .catch(mensaje => res.status(400).send(mensaje));
});

app.post('/api/docker/', (req, res) => {
    const nom = req.body.nombre
    const img = req.body.imagen
    ls.listarDocker(`docker run --name ${nom} -d ${img}`)
    .then(mensaje => res.send(mensaje))
    .catch(mensaje => res.status(400).send(mensaje));
});


