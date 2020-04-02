const { exec } = require("child_process"); //Modulo para ejecutar comandos en shell linux
//Defino una promesa que usa exec para ejecutar comandos en shell linux
let comandos = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(`error: ${error.message}`);
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`error: ${error.message}`);
                console.log(`stderr: ${stderr}`);
                return;
            }
            resolve(stdout);
            //res.json(stdout);
            //console.log(stdout);
        }); 
    })
}
module.exports = {
    comandos
}


