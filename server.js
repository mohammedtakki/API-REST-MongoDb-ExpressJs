const server = require('./app')
require('./config/db');
const port = process.env.PORT || 4000; // process ki3raf lina bli rah kayn wa7ad fichier .env

server.listen(port,()=>{
    console.log(`server is runing on ${port} port...`)
})