import { Router } from 'express';
const rutaCarrito = Router()

import { carController } from '../controller/carController.js';
const controlador = new carController()

import {postNew} from '../middlewares/cart.middle.js'

//Variable booleana que controla si el usuario es administrador
const admin = true

//**********Rutas al carrito***********//

//Mostrar todos los productos de un Carrito
rutaCarrito.get('/', controlador.getProd);
//Mostrar productos de un carrito según su ID
rutaCarrito.get('/:id', controlador.getProdId);
//Agregar un carrito
rutaCarrito.post('/:id/productos', postNew, controlador.addProd)
//Update Carrito
rutaCarrito.put('/:id/productos', controlador.putCar)
//Eliminar el carrito
rutaCarrito.delete('/:id', controlador.deleteCar);
//Eliminar producto del carrito
rutaCarrito.post('/:id/delete', controlador.deleteProd);

//**********Rutas no implementadas***********//
rutaCarrito.get('*', (req,res)=>{
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})

export default rutaCarrito;