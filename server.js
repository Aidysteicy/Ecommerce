
import app from './app.js'
import { createServer } from "http";
const httpServer = new createServer(app)
import { Server } from "socket.io";
const io = new Server(httpServer)
import {mensajesDao} from './src/daos/factoryDao.js'
import logger from './src/utils/logger.js';

try {
    io.on('connection', async socket=>{
        logger.info('Usuario conectado: ' +socket.id)
        const messages = await mensajesDao.getAll()
        socket.emit('central-mensajes', messages)
        socket.on('nuevo-mensaje', async data=>{
            await mensajesDao.save(data)
            const nuevo_mens = await mensajesDao.getAll()
            io.sockets.emit('central-mensajes', nuevo_mens)
        })
        socket.on('disconnect', ()=>{
            logger.info('Usuario desconectado')
        })
    })
} catch (error) {
    logger.error(error)
}
//****Configuración del puerto del servidor****//

const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT,()=> {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
});
server.on('Ocurrió un error ', error => console.log(error));

export {httpServer, PORT}