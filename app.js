//Core de APP
const express = require('express'); 
const metodos = require('./routes/metodos');
const app = express();

app.use(express.json());
//app.use(express.urlencoded()); //Body parser no usado
app.use('/api/docker', metodos); //Cargo el router que corre los metodos

const port = process.env.PORT || 3000; //Si quiero cambiar el puerto, modifico la variable de entorno PORT en OS.

app.listen(port, () => {
    console.log(`Escucando en puerto ${port}..`);
});