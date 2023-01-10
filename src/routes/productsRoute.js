import { Router } from 'express';
const rutaProductos = Router()

import passport from '../middlewares/passport.js';
import { prodController } from '../controller/prodController.js';
const controlador = new prodController()

//Variable booleana que controla si el usuario es administrador
const admin = true

//**********Rutas a los productos***********//
rutaProductos.get('/', passport.authenticate('login',{
    failureRedirect: '/fail',
    failureFlash: true
}), controlador.getProd);

rutaProductos.get('/:id', controlador.getProdId);
//Filtrar productos
rutaProductos.get('/categoria/:categoria', controlador.getProdField);
//Agregar producto
rutaProductos.post('/', controlador.saveProd);
//Actualizar producto
rutaProductos.put('/:id', controlador.putProd);
//Eliminar producto
rutaProductos.delete('/:id', controlador.deleteProd);

rutaProductos.get('/new', async(req,res)=>{
    res.render('addProd')
});

//**********Rutas no implementadas***********//
rutaProductos.get('*', (req,res)=>{
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})

export default rutaProductos;