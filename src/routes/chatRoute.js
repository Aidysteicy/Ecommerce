import { Router } from 'express';
const rutaMensajes = Router()

import { chatController } from '../controller/chatController.js';
const controlador = new chatController()
//Mostrar todos los mensajes
rutaMensajes.get('/', controlador.getChat)
//Mostrar mensajes de un usuario
rutaMensajes.get('/:email', controlador.getMensajes)
//Actualizar producto
rutaMensajes.put('/:id', controlador.putMensaje);
//Eliminar producto
rutaMensajes.delete('/:id', controlador.deleteMensaje);

//**********Rutas no implementadas***********//
rutaMensajes.get('*', (req,res)=>{
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})

export default rutaMensajes;