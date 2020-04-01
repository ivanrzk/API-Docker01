const { exec } = require("child_process");

let listarDocker = (cmd) => {
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
            //console.log(JSON.stringify(stdout));
        }); 
    })
}
module.exports = {
    listarDocker
}