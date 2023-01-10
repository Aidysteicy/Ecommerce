import { Router } from 'express';
const rutaCarrito = Router()

import { carController } from '../controller/carController.js';
const controlador = new carController()

import {postNew} from '../middlewares/cart.middle.js'

//Variable booleana que controla si el usuario es administrador
const admin = true

//**********Rutas al carrito***********//

//Mostrar todos los carritos
rutaCarrito.get('/', controlador.getProd);
//Mostrar productos de un carrito específico
rutaCarrito.get('/:id', controlador.getProdId);
//Agregar un carrito
rutaCarrito.post('/', postNew, controlador.addProd)
//Update Carrito
rutaCarrito.put('/:id/productos', controlador.putCar)
//Eliminar el carrito
rutaCarrito.delete('/:id', controlador.deleteCar);

//**********Rutas no implementadas***********//
rutaCarrito.get('*', (req,res)=>{
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})

export default rutaCarrito;