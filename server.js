import app from './app.js'
import { createServer } from "http";
const httpServer = new createServer(app)
import logger from './src/utils/logger.js';
import ApiMensajes from './src/api/apiMensajes.js';
const api = new ApiMensajes()
import { Server } from "socket.io";
const io = new Server(httpServer)

try {
    io.on('connection', async socket=>{
        logger.info('Usuario conectado: ' +socket.id)
        const messages = await api.obtenerMensajes()
        socket.emit('central-mensajes', messages)
        socket.on('nuevo-mensaje', async data=>{
            await api.guardarMensaje(data)
            const nuevo_mens = await api.obtenerMensajes()
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

export {httpServer}