const express = require('express'); 
const metodos = require('./routes/metodos');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/docker', metodos);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escucando en puerto ${port}..`);
});