import ApiCarrito from '../api/apiCarrito.js'
const api = new ApiCarrito()
import ApiProducto from '../api/apiProductos.js'
const apiProd = new ApiProducto()
import logger  from '../utils/logger.js';

class carController {

    async getProd (req, res) {
        try {
            const email= req.user.email
            const carr = await api.obtenerCarrito({email: email})
            let flag
            carr===undefined || carr.length===0 ? flag=false : flag=true
            res.status(200).render('carrito',{isRender: flag, productos: carr[0].productos})
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({error:error.message})
        }
    }

    async getProdId(req,res){
        const {id} = req.params
        const micarrito = api.obtenerCarrito({_id: id})
        if(micarrito.length!=0 && micarrito!='nok'){
            res.status(200).json(micarrito)
        }else{
            logger.error(error.message)
            res.status(500).json({msg: error.message})
        }
    }

    async addProd(req, res) {
        try {
            const username = req.user
            const {id} = req.params
            let cant = 1
            const car = await api.obtenerCarrito({email: username.email})
            const producto = await apiProd.obtenerProducto(id)
            const productsCar = car[0].productos
                productsCar.forEach(element => {
                    if(element._id==id){
                        cant = element.cantidad + 1
                    }
                });
            await api.eliminarProducto(producto[0]._id, username.email)
            await api.guardarProducto(producto[0], username, cant)
            res.redirect('/carrito')
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({error: error.message})
        }
    }

    async putCar (req,res){
        try {
            const {id}=req.params
            const prod = req.body
            const mod = api.modificarCarrito(id,prod)
            if(mod.length!=0 && mod!=undefined){
                res.send({msg: 'Carrito modificado'}) 
            }else{
                res.send({msg: 'Error al modificar carrito'})
            }
        } catch (error) {
            logger.error(error.message)
        }
        
        
    }

    async deleteCar(req,res){
        const {id}=req.params
        const prod = await api.eliminarCarrito(id)
        if(prod.length!=0 && prod!=undefined){
            res.send({msg: 'Carrito Eliminado'}) 
        }else{
            logger.error('No existe un carrito con ese ID')
            res.send({msg: 'No existe un carrito con ese ID'})
        }
    }

    async deleteProd(req, res) {
        try {
            const username = req.user
            const {id} = req.params
            let cant
            const producto = await apiProd.obtenerProducto(id)
            const car = await api.obtenerCarrito({email: username.email})
            const prod = car[0].productos
            prod.forEach(elem => {
                if(elem._id = id){
                    cant = elem.cantidad - 1
                }
            })
            await api.eliminarProducto(producto[0]._id, username.email)
            if(cant!=0){
                await api.guardarProducto(producto[0], username, cant)
            }
            res.redirect('/carrito')
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({error: error.message})
        }
    }
}

export {carController}