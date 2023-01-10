import { Router } from 'express';
const rutaOrdenes = Router()

import { orderController } from '../controller/orderController.js';
const controlador = new orderController()

//Variable booleana que controla si el usuario es administrador
const admin = true

//**********Rutas a las ordenes de compra***********//
rutaOrdenes.get('/', controlador.saveOrder);
rutaOrdenes.get('/:id', controlador.getOrder);
//Agregar Orden
rutaOrdenes.post('/', controlador.saveOrder);
//Actualizar Orden
rutaOrdenes.put('/:id', controlador.putOrder);
//Eliminar Orden
rutaOrdenes.delete('/:id', controlador.deleteOrder);

//**********Rutas no implementadas***********//
rutaOrdenes.get('*', (req,res)=>{
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})

export default rutaOrdenes;